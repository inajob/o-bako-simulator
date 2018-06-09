    const KEY_UP = 38;
    const KEY_DOWN = 40;
    const KEY_LEFT = 37;
    const KEY_RIGHT = 39;
    const KEY_START_BTN = 65; // a
    const KEY_A_BTN = 90; // z
    const KEY_B_BTN = 88; // x

    const size = 128;
    const zoom = 3;
    let buttonState = [0,0,0,0,0,0,0];
    let buttonTrig =  [0,0,0,0,0,0,0];
    let spriteImage;

    var osc= [];
    var gain= [];
    function initTones(){
      // init tones
      // osc -- gain -+
      // osc -- gain -+
      // osc -- gain -+- destination
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      let actx = new window.AudioContext();
      for(let i = 0; i < 3; i ++){
        osc[i] = actx.createOscillator();
        osc[i].type = 'sine';
        osc[i].frequency.value = 440 + 100*i;

        gain[i] = actx.createGain();
        osc[i].connect(gain[i]);
        gain[i].gain.value = 0.00;
        gain[i].connect(actx.destination);
        osc[i].start();
      }

    }

    function initLua(ctx){
      const L = fengari.lauxlib.luaL_newstate();
      fengari.lualib.luaL_openlibs(L);
      let canvasState = {color: [0,0,0]};

      // register functions
      fengari.lua.lua_register(L, "tone", function(){
        const n = fengari.lua.lua_tointeger(L, 1);
        const f = fengari.lua.lua_tointeger(L, 2);
        const v = fengari.lua.lua_tointeger(L, 3);

        osc[n].frequency.value = f;
        gain[n].gain.value = (v/255);
        return 0;
      });

      fengari.lua.lua_register(L, "spr", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const w = fengari.lua.lua_tointeger(L, 3);
        const h = fengari.lua.lua_tointeger(L, 4);
        const sx = fengari.lua.lua_tointeger(L, 5);
        const sy = fengari.lua.lua_tointeger(L, 6);
        let sw = w;
        let sh = h;
        if(fengari.lua.lua_gettop(L) == 8){
          sw = fengari.lua.lua_tointeger(L, 7);
          sh = fengari.lua.lua_tointeger(L, 8);
        }

        ctx.drawImage(spriteImage, sx, sy, sw, sh, x, y, w, h);
        return 0;
      });


      fengari.lua.lua_register(L, "color", function(){
        const r = fengari.lua.lua_tointeger(L, 1);
        const g = fengari.lua.lua_tointeger(L, 2);
        const b = fengari.lua.lua_tointeger(L, 3);

        canvasState.color = [r, g, b];
        ctx.fillStyle = "rgb(" + [r,g,b].join(",") + ")"
        ctx.strokeStyle = "rgb(" + [r,g,b].join(",") + ")"
        return 0;
      });

      fengari.lua.lua_register(L, "text", function(){
        const s = fengari.lua.lua_tostring(L, 1);
        const x = fengari.lua.lua_tointeger(L, 2);
        const y = fengari.lua.lua_tointeger(L, 3);
        const ss = fengari.to_jsstring(s);
        ctx.fillText(ss, x, y + 8);
        return 0;
      });

      fengari.lua.lua_register(L, "pset", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        ctx.fillRect(x, y, 1, 1);
        return 0;
      });

      fengari.lua.lua_register(L, "line", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const x2 = fengari.lua.lua_tointeger(L, 3);
        const y2 = fengari.lua.lua_tointeger(L, 4);
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return 0;
      });

      fengari.lua.lua_register(L, "drawrect", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const w = fengari.lua.lua_tointeger(L, 3);
        const h = fengari.lua.lua_tointeger(L, 4);
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.stroke();
        return 0;
      });

      fengari.lua.lua_register(L, "fillrect", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const w = fengari.lua.lua_tointeger(L, 3);
        const h = fengari.lua.lua_tointeger(L, 4);
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
        return 0;
      });

      fengari.lua.lua_register(L, "drawcircle", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const r = fengari.lua.lua_tointeger(L, 3);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
        return 0;
      });

      fengari.lua.lua_register(L, "fillcircle", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const r = fengari.lua.lua_tointeger(L, 3);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        return 0;
      });


      fengari.lua.lua_register(L, "btn", function(){
        const n = fengari.lua.lua_tointeger(L, 1);
        fengari.lua.lua_pushnumber(L, buttonTrig[n]);
        return 1;
      });
      return L;
    }

    let timer = null;

    function runGame(L, s, c, ctxm, errf){
      let ret = fengari.lauxlib.luaL_dostring(L, s);
      if(ret != 0){
        errf(fengari.to_jsstring(fengari.lua.lua_tostring(L, -1)));
        return;
      }

      fengari.lua.lua_getglobal(L, "setup");
      ret = fengari.lua.lua_call(L, 0, 0);
      if(ret == 0){
        errf(fengari.to_jsstring(fengari.lua.lua_tostring(L, -1)));
        return;
      }
      function next(t){
        let d = (new Date).getTime();
        timer = setTimeout(function(){
          timer = null;
          fengari.lua.lua_getglobal(L, "loop");
          ret = fengari.lua.lua_call(L, 0, 0);
          if(ret == 0){
            errf(fengari.to_jsstring(fengari.lua.lua_tostring(L, -1)));
            return;
          }

          let now = (new Date).getTime();

          for(let i = 0; i < buttonState.length; i ++){
            if(buttonTrig[i] == -1){
              buttonTrig[i] = 0;
            }
            if(buttonState[i] == 1){
              buttonTrig[i] ++;
            }else{
              buttonTrig[i] = -1;
            }
          }
          ctxm.drawImage(c, 0, 0, size*zoom, size*zoom)

          next(1000/30 - (now - d));
        }, t);
      }
      next(1000/30);
    }

    function loadFile(address, type, f){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            f(xhr.response);
          }
        }
      };
      xhr.open("GET", address);
      xhr.responseType = type;
      xhr.send();
    }
    var downloadQueue = {};

    function isDownloadComplete(){
      for(x in downloadQueue){
        if(downloadQueue[x].body == undefined){
          return false
        }
      }
      return true;
    }

    function loadGame(address, execute){
      loadFile(address + "/game.json", "text", function(o){
        const obj = JSON.parse(o);
        console.log("game.json", obj)
        // todo: multiple scripts, images
        //const scripts = obj.scripts;
        //const images = obj.images;
        //scripts.forEach(function(e){downloadQueue[e] = {path: e, type: "script"}});
        //images.forEach(function(e){downloadQueue[e] = {path: e, type: "image"}});
        downloadQueue[obj.script] = {path: obj.script, type: "script"};
        downloadQueue[obj.image] = {path: obj.image, type: "image"};

        Object.keys(downloadQueue).forEach(function(e){
          (function(e){
            let type = "text";
            if(downloadQueue[e].type == "image"){
              type = "arraybuffer"
            }
            loadFile(address + "/" + e, type, function(o){
              downloadQueue[e].body = o;
              if(isDownloadComplete()){
                // all downloaded
                console.log("download all");
                initGame(execute);
              }
            });
          })(e)
        });
      });
    }
    function initGame(execute){
      for(x in downloadQueue){
        switch(downloadQueue[x].type){
          case "script":
            // todo: only support single script
            if(mode == "editor"){
              editor.setValue(downloadQueue[x].body);
            }else{
              let editor = document.getElementById("editor");
              editor.value = downloadQueue[x].body;
            }
            console.log("set value");
          break;
          case "image":
            // todo: only support single image
            loadBitmap(downloadQueue[x].body);
            console.log("load bitmap");
          break;
          default:
            console.log("unknown type:" + downloadQueue[x].type);
        }
      }
      execute();
    }



    function loadBitmap(arr){
      var byteArray = new Uint8Array(arr);
      console.log(byteArray[1])
      if(byteArray[0] != 'B'.charCodeAt(0)){errf("bitmap header error 0");return -1}
      if(byteArray[1] != 'M'.charCodeAt(0)){errf("bitmap header error 1");return -1}
      let offset = (byteArray[13]<<24) + (byteArray[12]<<16) + (byteArray[11]<<8) + byteArray[10];
      let width  = (byteArray[15]<<24) + (byteArray[16]<<16) + (byteArray[17]<<8) + byteArray[18];
      let height = (byteArray[25]<<24) + (byteArray[24]<<16) + (byteArray[23]<<8) + byteArray[22];
      let biBitCount = (byteArray[29]<<8) + byteArray[28];
      if(width != 128){errf("invalid bitmap width " + width);return -1}
      if(height != 128){errf("invalid bitmap height " + height);return -1}
      if(biBitCount != 8){errf("invalid bitmap bitCount " + biBitCount);return -1}
      let biSize = (byteArray[17]<<24) + (byteArray[16]<<16) + (byteArray[15]<<8) + byteArray[14];
      let paletteStart = 14 + biSize;
      let palette=[];
      for(let i = 0; i < 256; i ++){
        palette[i] = [byteArray[paletteStart + i*4],byteArray[paletteStart + i*4 + 1],byteArray[paletteStart + i*4 + 2]]
      }
      let sctx = spriteImage.getContext("2d");
      for(let i = 0; i < width*height; i ++){
        let index = byteArray[offset + width*height - i - 1];
        let alpha = (index == 0)?0:255;
        sctx.fillStyle = "rgba(" + palette[index][2] + ","  + palette[index][1] + ","  + palette[index][0] + "," + alpha + ")"
        sctx.fillRect(128 - i%128 - 1, Math.floor(i/128), 1, 1);
      }
    }

    var c, ctx,ctxm;
    window.addEventListener("load",function(){
      //editor = ace.edit("editor");
      //editor.setTheme("ace/theme/monokai");
      //editor.session.setMode("ace/mode/lua");

      if(mode == "editor"){
        window.addEventListener("keyup",function(e){
          if(!editor.isFocused()){
            e.preventDefault();
            switch(e.keyCode){
              case KEY_UP: buttonState[2] = 0; break;
              case KEY_DOWN: buttonState[3] = 0; break;
              case KEY_LEFT: buttonState[0] = 0; break;
              case KEY_RIGHT: buttonState[1] = 0; break;
              case KEY_START_BTN: buttonState[4] = 0; break;
              case KEY_A_BTN: buttonState[5] = 0; break;
              case KEY_B_BTN: buttonState[6] = 0; break;
            }
            return false;
          }
        });
        window.addEventListener("keydown",function(e){
          if(mode == "editor" && !editor.isFocused()){
            switch(e.keyCode){
              case KEY_UP: buttonState[2] = 1; break;
              case KEY_DOWN: buttonState[3] = 1; break;
              case KEY_LEFT: buttonState[0] = 1; break;
              case KEY_RIGHT: buttonState[1] = 1; break;
              case KEY_START_BTN: buttonState[4] = 1; break;
              case KEY_A_BTN: buttonState[5] = 1; break;
              case KEY_B_BTN: buttonState[6] = 1; break;
            }
            e.preventDefault();
            return false;
          }
        });
      }else{ //mobile
        const btnAttach = function(id, no){
          let elm = document.getElementById(id);
          elm.addEventListener("touchstart",function(e){
            buttonState[no] = 1;
          });
          elm.addEventListener("mousedown",function(e){
            buttonState[no] = 1;
          });

          elm.addEventListener("touchend",function(e){
            buttonState[no] = 0;
          });
          elm.addEventListener("mouseup",function(e){
            buttonState[no] = 0;
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

      c = document.getElementById("original");
      c.width = size;
      c.height = size;

      ctx = c.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.font = "11px 'ＭＳ ゴシック',sans-serif";

      const m = document.getElementById("main");
      m.width = size * zoom;
      m.height = size * zoom;

      ctxm = m.getContext("2d");
      ctxm.imageSmoothingEnabled = false;

      initTones();
      let L;

      function errf(s){
        console.log(s);
      }
    });

