    const size = 128;
    const zoom = 3;
    let spriteImage;
    lib = new OBakoLib(null, spriteImage)

    function initDuktape(ctx){
      lib.ctx = ctx // TODO: set at constructor

      // register functions
      dukwebEval('tone = function (n,f,v){\n'+
      'var ret=Dukweb.eval("window.lib.tone()");\n'+
      'return ret;\n'+
      '}');
      dukwebEval('spr = function(x,y,w,h,sx,sy,sw,sh){\n'+
      'var ret = Dukweb.eval("window.lib.spr(" +x+ "," +y+ "," +w+ "," +h+ "," +sx+ "," +sy+ "," +sw+ "," +sh+ ")");\n' +
      'return ret;\n' +
      '}');
      dukwebEval('color = function(r,g,b){\n'+
      'var ret = Dukweb.eval("window.lib.color(" +r+ "," +g+ "," +b+ ")");\n' +
      'return ret;\n' +
      '}');
      dukwebEval('text = function(s,x,y){\n'+
      "var ret = Dukweb.eval('window.lib.text('+"+
      "JSON.stringify(s)+','+x+','+y+"+
      "')');\n" +
      'return ret;\n' +
      '}');
      dukwebEval('pset = function(x,y){\n'+
      'var ret = Dukweb.eval("window.lib.pset("+x+","+y+")");\n' +
      'return ret;\n' +
      '}');

      dukwebEval('drawrect = function(x,y,w,h){\n'+
      'var ret = Dukweb.eval("window.lib.drawrect("+x+","+y+","+w+","+h+")");\n' +
      'return ret;\n' +
      '}');
      dukwebEval('fillrect = function(x,y,w,h){\n'+
      'var ret = Dukweb.eval("window.lib.fillrect("+x+","+y+","+w+","+h+")");\n' +
      'return ret;\n' +
      '}');

      // not use Dukweb.eval because it is very slow.
      dukwebEval('btn = function(n){\n'+
      'var ret = buttonTrig[n];\n' +
      'return ret;\n' +
      '}');


      return L;
    }

    let timer = null;

    function runGame(L, s, c, ctxm, errf){
      try{
        let ret = dukwebEval(s);
      }catch(e){
        errf(e.res);
        return;
      }

      try{
        let ret = dukwebEval("setup()");
      }catch(e){
        errf(e.res);
        return;
      }

      function next(t){
        let d = (new Date).getTime();
        timer = setTimeout(function(){
          timer = null;
          try{
            let ret = dukwebEval("loop()");
          }catch(e){
            errf(e.res);
            return;
          }

          dukwebEval('buttonTrig = []');

          lib.updateTrigger()

          // access lib because Dukweb.eval is slow
          for(let i = 0; i < lib.buttonState.length; i ++){
            dukwebEval('buttonTrig['+ i +'] = ' + lib.buttonTrig[i]);
          }
          ctxm.drawImage(originalCanvas, 0, 0, size*zoom, size*zoom)
          let now = (new Date).getTime();

          next(1000/30 - (now - d));
        }, t);
      }
      next(1000/30);
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
      let L;

      function errf(s){
        console.log(s);
      }
    });
