    const size = 128;
    const zoom = 3;
    let spriteImage;
    lib = new OBakoLib(null, spriteImage)

    function initAssemblyScript(ctx){
      lib.ctx = ctx // TODO: set at constructor
    }


    let timer = null;

    function runGame(L, SOURCE_CODE, asc, ctxm, errf){
      let exportsCode = `
@external("env", "spr") declare function spr(x: i32, y: i32, w: i32, h: i32, sx: i32, sy: i32, sw: i32, sh: i32): void;
@external("env", "color") declare function color(r: i32, g:i32, b: i32): void;
@external("env", "text") declare function text(s: string, x:i32, y: i32): void;
@external("env", "pset") declare function pset(x: i32, y:i32): void;
@external("env", "drawrect") declare function drawrect(x: i32, y:i32, w: i32, h: i32): void;
@external("env", "fillrect") declare function fillrect(x: i32, y:i32, w: i32, h: i32): void;
@external("env", "drawcircle") declare function drawcircle(x: i32, y:i32, r: i32): void;
@external("env", "fillcircle") declare function fillcircle(x: i32, y:i32, r: i32): void;
@external("env", "btn") declare function btn(n: i32): i32;
@external("env", "random") declare function random(): f64;
      `
      try{
        // == setup AssemblyScript Environment ===
        function random(){
          return Math.random()
        }
        var myMemory;
        const exportToWasm = {
          env: {
            abort: () => console.error("abort"),
            spr: lib.spr.bind(lib),
            color: lib.color.bind(lib),
            text: (sp, x, y) =>{
              let s = getString(sp)
              return lib.text(s, x, y)
            },
            pset: lib.pset.bind(lib),
            drawrect: lib.drawrect.bind(lib),
            fillrect: lib.fillrect.bind(lib),
            drawcircle: lib.drawcircle.bind(lib),
            fillcircle: lib.fillcircle.bind(lib),
            btn: lib.btn.bind(lib),
            random,
          }
        }

        // from: https://github.com/AssemblyScript/assemblyscript/blob/master/lib/loader/index.js
        function getString(ptr){
          const SIZE_OFFSET = -4;
          const CHUNKSIZE = 1024;

          let buffer = myMemory.buffer;

          const U32 = new Uint32Array(buffer);
          const U16 = new Uint16Array(buffer);
          let length = U32[ptr + SIZE_OFFSET >>> 2] >>> 1;
          let offset = ptr >>> 1;
          if (length <= CHUNKSIZE) return String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
          let parts = '';
          do {
            const last = U16[offset + CHUNKSIZE - 1];
            const size = last >= 0xD800 && last < 0xDC00 ? CHUNKSIZE - 1 : CHUNKSIZE;
            parts += String.fromCharCode.apply(String, U16.subarray(offset, offset += size));
            length -= size;
          } while (length > CHUNKSIZE);
          return parts + String.fromCharCode.apply(String, U16.subarray(offset, offset + length));

        }

        const { text, binary, stdout, stderr } = asc.compileString(exportsCode + SOURCE_CODE, {
          optimizeLevel: 3,
          runtime: "none"
        });
        console.log(`>>> TEXT >>>\n${text}`);
        console.log(`>>> STDOUT >>>\n${stdout}`);
        console.log(`>>> STDERR >>>\n${stderr}`);
        console.log(`>>> BINARY >>>\n${binary.length} bytes`);

        WebAssembly.compile(binary).then(mod => {
          WebAssembly.instantiate(mod, exportToWasm).then(instance => {
            myMemory = instance.exports.memory // TODO: find more smart way
            instance.exports.setup()

            function next(t){
              let d = (new Date).getTime();
              timer = setTimeout(function(){
                timer = null;
                try{
                  let ret = instance.exports.loop()
                }catch(e){
                  console.log(e)
                  errf(e.res);
                  return;
                }

                lib.updateTrigger()
                ctxm.drawImage(originalCanvas, 0, 0, size*zoom, size*zoom)
                let now = (new Date).getTime();

                next(1000/30 - (now - d));
              }, t);
            }
            next(1000/30);

          });
        })
      }catch(e){
        console.log(e)
        errf(e.res);
        return;
      }

    }

    function initGame(execute){
      for(x in util.downloadQueue){
        switch(util.downloadQueue[x].type){
          case "script":
            // todo: only support single script
            if(mode == "editor"){
              editor.setValue(util.downloadQueue[x].body);
            }else{
              let editor = document.getElementById("editor");
              editor.value = util.downloadQueue[x].body;
            }
            console.log("set value");
          break;
          case "image":
            // todo: only support single image
            util.loadBitmap(util.downloadQueue[x].body, spriteImage);
            console.log("load bitmap");
          break;
          default:
            console.log("unknown type:" + util.downloadQueue[x].type);
        }
      }
      execute();
    }

    var originalCanvas,ctx,ctxm;

    window.addEventListener("load",function(){
      //editor = ace.edit("editor");
      //editor.setTheme("ace/theme/monokai");
      //editor.session.setMode("ace/mode/lua");

      if(mode == "editor"){
        window.addEventListener("keyup",function(e){
          if(!editor.isFocused()){
            e.preventDefault();
            lib.keyup(e.keyCode)
            return false;
          }
        });
        window.addEventListener("keydown",function(e){
          if(mode == "editor" && !editor.isFocused()){
            e.preventDefault();
            lib.keydown(e.keyCode)
            return false;
          }
        });
      }else{ //mobile
        const btnAttach = function(id, no){
          let elm = document.getElementById(id);
          elm.addEventListener("touchstart",function(e){
            lib.buttondown(no);
          });
          elm.addEventListener("mousedown",function(e){
            lib.buttondown(no);
          });

          elm.addEventListener("touchend",function(e){
            lib.buttonup(no);
          });
          elm.addEventListener("mouseup",function(e){
            lib.buttonup(no);
          });

        }
        btnAttach("btn_l", 0);
        btnAttach("btn_r", 1);
        btnAttach("btn_u", 2);
        btnAttach("btn_d", 3);
        btnAttach("btn_s", 4);
        btnAttach("btn_a", 5);
        btnAttach("btn_b", 6);
      }
      // init canvas
      spriteImage = document.getElementById("sprite");
      sprite.width = 128;
      sprite.height = 128;

      originalCanvas = document.getElementById("original");
      originalCanvas.width = size;
      originalCanvas.height = size;

      ctx = originalCanvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.font = "11px 'ＭＳ ゴシック',sans-serif";

      const m = document.getElementById("main");
      m.width = size * zoom;
      m.height = size * zoom;

      ctxm = m.getContext("2d");
      ctxm.imageSmoothingEnabled = false;

      lib.initTones();

      function errf(s){
        console.log(s);
      }
    });
