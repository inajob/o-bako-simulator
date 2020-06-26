// o-bako library

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_START_BTN = 65; // a
const KEY_A_BTN = 90; // z
const KEY_B_BTN = 88; // x

class OBakoLib {
  constructor(ctx, spriteImage){
    this.osc = []
    this.gain = []
    this.buttonState = [0,0,0,0,0,0,0];
    this.buttonTrig =  [0,0,0,0,0,0,0];

    this.ctx = ctx
    this.spriteImage = spriteImage
  }

  initTones() {
    // init tones
    // osc -- gain -+
    // osc -- gain -+
    // osc -- gain -+- destination
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    let actx = new window.AudioContext();
    for(let i = 0; i < 3; i ++){
      this.osc[i] = actx.createOscillator();
      this.osc[i].type = 'sine';
      this.osc[i].frequency.value = 440 + 100*i;

      this.gain[i] = actx.createGain();
      this.osc[i].connect(this.gain[i]);
      this.gain[i].gain.value = 0.00;
      this.gain[i].connect(actx.destination);
      this.osc[i].start();
    }
  }
  tone(n, f, v) {
        osc[n].frequency.value = f;
        gain[n].gain.value = (v/255);
        return 0;
  }
  spr(x, y, w, h, sx, sy, sw, sh){
        var sw = sw || w;
        var sh = sh || h;
        this.ctx.drawImage(spriteImage, sx, sy, sw, sh, x, y, w, h);
        return 0;
  }
  color(r, g, b) {
    this.ctx.fillStyle = "rgb(" + [r,g,b].join(",") + ")"
    this.ctx.strokeStyle = "rgb(" + [r,g,b].join(",") + ")"
    return 0;
  }
  text(s, x, y) {
    this.ctx.fillText(s, x, y + 8);
    return 0;
  }
  pset(x, y) {
    this.ctx.fillRect(x, y, 1, 1)
    return 0;
  }
  line(x, y, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x,y);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    return 0;
  }
  drawrect (x, y, w, h){
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.stroke();
    return 0;
  }
  fillrect (x, y, w, h){
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.fill();
    return 0;
  }
  drawcircle (x, y, r) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.stroke();
    return 0;
  }
  fillcircle (x, y, r) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fill();
    return 0;
  }
  btn (n){
    var ret = this.buttonTrig[n];
    return ret;
  }

  updateTrigger(){
    for(let i = 0; i < this.buttonState.length; i ++){
      if(this.buttonTrig[i] == -1){
        this.buttonTrig[i] = 0;
      }
      if(this.buttonState[i] == 1){
        this.buttonTrig[i] ++;
      }else{
        this.buttonTrig[i] = -1;
      }
    }
  }

  keyup(code){
    switch(code){
      case KEY_UP: this.buttonState[2] = 0; break;
      case KEY_DOWN: this.buttonState[3] = 0; break;
      case KEY_LEFT: this.buttonState[0] = 0; break;
      case KEY_RIGHT: this.buttonState[1] = 0; break;
      case KEY_START_BTN: this.buttonState[4] = 0; break;
      case KEY_A_BTN: this.buttonState[5] = 0; break;
      case KEY_B_BTN: this.buttonState[6] = 0; break;
    }
  }
  keydown(code){
    switch(code){
      case KEY_UP: this.buttonState[2] = 1; break;
      case KEY_DOWN: this.buttonState[3] = 1; break;
      case KEY_LEFT: this.buttonState[0] = 1; break;
      case KEY_RIGHT: this.buttonState[1] = 1; break;
      case KEY_START_BTN: this.buttonState[4] = 1; break;
      case KEY_A_BTN: this.buttonState[5] = 1; break;
      case KEY_B_BTN: this.buttonState[6] = 1; break;
    }
  }
  buttonup(no){
    this.buttonState[no] = 0
  }
  buttondown(no){
    this.buttonState[no] = 1
  }
}

class OBakoUtil {
  constructor(){
    this.downloadQueue = {}
  }
  loadFile (address, type, f){
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

  isDownloadComplete (){
    for(let x in this.downloadQueue){
      if(this.downloadQueue[x].body == undefined){
        return false
      }
    }
    return true;
  }

  loadGame (address, initGameClosure){
    this.loadFile(address + "/game.json", "text", (o) => {
      const obj = JSON.parse(o);
      console.log("game.json", obj)
      // todo: multiple scripts, images
      //const scripts = obj.scripts;
      //const images = obj.images;
      //scripts.forEach(function(e){downloadQueue[e] = {path: e, type: "script"}});
      //images.forEach(function(e){downloadQueue[e] = {path: e, type: "image"}});
      this.downloadQueue[obj.script] = {path: obj.script, type: "script"};
      this.downloadQueue[obj.image] = {path: obj.image, type: "image"};

      Object.keys(this.downloadQueue).forEach((e) => {
        ((e) => {
          let type = "text";
          if(this.downloadQueue[e].type == "image"){
            type = "arraybuffer"
          }
          this.loadFile(address + "/" + e, type, (o) => {
            this.downloadQueue[e].body = o;
            if(this.isDownloadComplete()){
              // all downloaded
              console.log("download all");
              initGameClosure()
            }
          });
        })(e)
      });
    });
  }

  loadBitmap (arr, spriteImage){
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
}
