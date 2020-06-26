    const size = 128;
    const zoom = 3;
    let spriteImage;
    let lib = new OBakoLib(null, spriteImage)

    function initLua(ctx){
      lib.ctx = ctx // TODO: set at constructor
      const L = fengari.lauxlib.luaL_newstate();
      fengari.lualib.luaL_openlibs(L);

      // register functions
      fengari.lua.lua_register(L, "tone", function(){
        const n = fengari.lua.lua_tointeger(L, 1);
        const f = fengari.lua.lua_tointeger(L, 2);
        const v = fengari.lua.lua_tointeger(L, 3);

        return lib.tone(n, f, v);
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

        return lib.spr(x, y, w, h, sx, sy, sw, sh);
      });


      fengari.lua.lua_register(L, "color", function(){
        const r = fengari.lua.lua_tointeger(L, 1);
        const g = fengari.lua.lua_tointeger(L, 2);
        const b = fengari.lua.lua_tointeger(L, 3);

        return lib.color(r, g, b)
      });

      fengari.lua.lua_register(L, "text", function(){
        const s = fengari.lua.lua_tostring(L, 1);
        const x = fengari.lua.lua_tointeger(L, 2);
        const y = fengari.lua.lua_tointeger(L, 3);
        const ss = fengari.to_jsstring(s);

        return lib.text(ss, x, y + 8);
      });

      fengari.lua.lua_register(L, "pset", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);

        return lib.pset(x, y);
      });

      fengari.lua.lua_register(L, "line", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const x2 = fengari.lua.lua_tointeger(L, 3);
        const y2 = fengari.lua.lua_tointeger(L, 4);
        return lib.line(x, y, x2, y2)
      });

      fengari.lua.lua_register(L, "drawrect", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const w = fengari.lua.lua_tointeger(L, 3);
        const h = fengari.lua.lua_tointeger(L, 4);
        return lib.drawrect(x, y, w, h);
      });

      fengari.lua.lua_register(L, "fillrect", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const w = fengari.lua.lua_tointeger(L, 3);
        const h = fengari.lua.lua_tointeger(L, 4);
        return lib.fillrect(x, y, w, h);
      });

      fengari.lua.lua_register(L, "drawcircle", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const r = fengari.lua.lua_tointeger(L, 3);
        return lib.drawcircle(x, y, r);
      });

      fengari.lua.lua_register(L, "fillcircle", function(){
        const x = fengari.lua.lua_tointeger(L, 1);
        const y = fengari.lua.lua_tointeger(L, 2);
        const r = fengari.lua.lua_tointeger(L, 3);
        return lib.fillcircle(x, y, r);
      });


      fengari.lua.lua_register(L, "btn", function(){
        const n = fengari.lua.lua_tointeger(L, 1);
        fengari.lua.lua_pushnumber(L, lib.btn(n));
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

          lib.updateTrigger()

          ctxm.drawImage(c, 0, 0, size*zoom, size*zoom)

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

    var c, ctx,ctxm;
    window.addEventListener("load",function(){
      //editor = ace.edit("editor");
      //editor.setTheme("ace/theme/monokai");
      //editor.session.setMode("ace/mode/lua");

      if(mode == "editor"){
        window.addEventListener("keyup",function(e){
          if(!editor.isFocused()){
            lib.keyup(e.keyCode);
            e.preventDefault();
            return false;
          }
        });
        window.addEventListener("keydown",function(e){
          if(mode == "editor" && !editor.isFocused()){
            lib.keydown(e.keyCode);
            e.preventDefault();
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

      lib.initTones();
      let L;

      function errf(s){
        console.log(s);
      }
    });

