var c;c||(c=typeof Module !== 'undefined' ? Module : {});var g={},r;for(r in c)c.hasOwnProperty(r)&&(g[r]=c[r]);c.arguments=[];c.thisProgram="./this.program";c.quit=function(a,b){throw b;};c.preRun=[];c.postRun=[];var t=!1,u=!1,v=!1,aa=!1;t="object"===typeof window;u="function"===typeof importScripts;v="object"===typeof process&&"function"===typeof require&&!t&&!u;aa=!t&&!v&&!u;var w="";
if(v){w=__dirname+"/";var x,ba;c.read=function(a,b){x||(x=require("fs"));ba||(ba=require("path"));a=ba.normalize(a);a=x.readFileSync(a);return b?a:a.toString()};c.readBinary=function(a){a=c.read(a,!0);a.buffer||(a=new Uint8Array(a));assert(a.buffer);return a};1<process.argv.length&&(c.thisProgram=process.argv[1].replace(/\\/g,"/"));c.arguments=process.argv.slice(2);"undefined"!==typeof module&&(module.exports=c);process.on("uncaughtException",function(a){if(!(a instanceof y))throw a;});process.on("unhandledRejection",
z);c.quit=function(a){process.exit(a)};c.inspect=function(){return"[Emscripten Module object]"}}else if(aa)"undefined"!=typeof read&&(c.read=function(a){return read(a)}),c.readBinary=function(a){if("function"===typeof readbuffer)return new Uint8Array(readbuffer(a));a=read(a,"binary");assert("object"===typeof a);return a},"undefined"!=typeof scriptArgs?c.arguments=scriptArgs:"undefined"!=typeof arguments&&(c.arguments=arguments),"function"===typeof quit&&(c.quit=function(a){quit(a)});else if(t||u)u?
w=self.location.href:document.currentScript&&(w=document.currentScript.src),w=0!==w.indexOf("blob:")?w.substr(0,w.lastIndexOf("/")+1):"",c.read=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},u&&(c.readBinary=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),c.readAsync=function(a,b,d){var f=new XMLHttpRequest;f.open("GET",a,!0);f.responseType="arraybuffer";f.onload=function(){200==
f.status||0==f.status&&f.response?b(f.response):d()};f.onerror=d;f.send(null)},c.setWindowTitle=function(a){document.title=a};var ca=c.print||("undefined"!==typeof console?console.log.bind(console):"undefined"!==typeof print?print:null),A=c.printErr||("undefined"!==typeof printErr?printErr:"undefined"!==typeof console&&console.warn.bind(console)||ca);for(r in g)g.hasOwnProperty(r)&&(c[r]=g[r]);g=void 0;function da(a){var b=B[C>>2];a=b+a+15&-16;if(a<=ea())B[C>>2]=a;else return 0;return b}
var fa={"f64-rem":function(a,b){return a%b},"debugger":function(){debugger}},ha=0;"object"!==typeof WebAssembly&&A("no native wasm support detected");var ia,ja=!1;function assert(a,b){a||z("Assertion failed: "+b)}function ka(a){var b=c["_"+a];assert(b,"Cannot call unknown function "+a+", make sure it is exported");return b}
function la(a,b,d,f){var e={string:function(a){var b=0;if(null!==a&&void 0!==a&&0!==a){var d=(a.length<<2)+1;b=ma(d);na(a,D,b,d)}return b},array:function(a){var b=ma(a.length);E.set(a,b);return b}},h=ka(a),k=[];a=0;if(f)for(var l=0;l<f.length;l++){var m=e[d[l]];m?(0===a&&(a=F()),k[l]=m(f[l])):k[l]=f[l]}d=h.apply(null,k);d=function(a){return"string"===b?G(a):"boolean"===b?!!a:a}(d);0!==a&&H(a);return d}
function oa(a){if("number"===typeof a){var b=!0;var d=a}else b=!1,d=a.length;var f=pa(Math.max(d,1));if(b){a=f;assert(0==(f&3));for(b=f+(d&-4);a<b;a+=4)B[a>>2]=0;for(b=f+d;a<b;)E[a++>>0]=0;return f}a.subarray||a.slice?D.set(a,f):D.set(new Uint8Array(a),f);return f}var qa="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;
function ra(a,b,d){var f=b+d;for(d=b;a[d]&&!(d>=f);)++d;if(16<d-b&&a.subarray&&qa)return qa.decode(a.subarray(b,d));for(f="";b<d;){var e=a[b++];if(e&128){var h=a[b++]&63;if(192==(e&224))f+=String.fromCharCode((e&31)<<6|h);else{var k=a[b++]&63;e=224==(e&240)?(e&15)<<12|h<<6|k:(e&7)<<18|h<<12|k<<6|a[b++]&63;65536>e?f+=String.fromCharCode(e):(e-=65536,f+=String.fromCharCode(55296|e>>10,56320|e&1023))}}else f+=String.fromCharCode(e)}return f}function G(a){return a?ra(D,a,void 0):""}
function na(a,b,d,f){if(!(0<f))return 0;var e=d;f=d+f-1;for(var h=0;h<a.length;++h){var k=a.charCodeAt(h);if(55296<=k&&57343>=k){var l=a.charCodeAt(++h);k=65536+((k&1023)<<10)|l&1023}if(127>=k){if(d>=f)break;b[d++]=k}else{if(2047>=k){if(d+1>=f)break;b[d++]=192|k>>6}else{if(65535>=k){if(d+2>=f)break;b[d++]=224|k>>12}else{if(d+3>=f)break;b[d++]=240|k>>18;b[d++]=128|k>>12&63}b[d++]=128|k>>6&63}b[d++]=128|k&63}}b[d]=0;return d-e}"undefined"!==typeof TextDecoder&&new TextDecoder("utf-16le");
var buffer,E,D,B,C=1072736,I=c.TOTAL_MEMORY||16777216;5242880>I&&A("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+I+"! (TOTAL_STACK=5242880)");c.buffer?buffer=c.buffer:"object"===typeof WebAssembly&&"function"===typeof WebAssembly.Memory?(ia=new WebAssembly.Memory({initial:I/65536,maximum:I/65536}),buffer=ia.buffer):buffer=new ArrayBuffer(I);c.HEAP8=E=new Int8Array(buffer);c.HEAP16=new Int16Array(buffer);c.HEAP32=B=new Int32Array(buffer);c.HEAPU8=D=new Uint8Array(buffer);c.HEAPU16=new Uint16Array(buffer);
c.HEAPU32=new Uint32Array(buffer);c.HEAPF32=new Float32Array(buffer);c.HEAPF64=new Float64Array(buffer);B[C>>2]=6315872;function J(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b();else{var d=b.C;"number"===typeof d?void 0===b.i?c.dynCall_v(d):c.dynCall_vi(d,b.i):d(void 0===b.i?null:b.i)}}}var sa=[],ta=[],ua=[],va=[],K=!1;function wa(){var a=c.preRun.shift();sa.unshift(a)}var xa=Math.trunc,L=0,ya=null,M=null;c.preloadedImages={};c.preloadedAudios={};
function za(){var a=N;return String.prototype.startsWith?a.startsWith("data:application/octet-stream;base64,"):0===a.indexOf("data:application/octet-stream;base64,")}var N="out.wasm";if(!za()){var Aa=N;N=c.locateFile?c.locateFile(Aa,w):w+Aa}function Ba(){try{if(c.wasmBinary)return new Uint8Array(c.wasmBinary);if(c.readBinary)return c.readBinary(N);throw"both async and sync fetching of the wasm failed";}catch(a){z(a)}}
function Ca(){return c.wasmBinary||!t&&!u||"function"!==typeof fetch?new Promise(function(a){a(Ba())}):fetch(N,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+N+"'";return a.arrayBuffer()}).catch(function(){return Ba()})}
function Da(a){function b(a){c.asm=a.exports;L--;c.monitorRunDependencies&&c.monitorRunDependencies(L);0==L&&(null!==ya&&(clearInterval(ya),ya=null),M&&(a=M,M=null,a()))}function d(a){b(a.instance)}function f(a){Ca().then(function(a){return WebAssembly.instantiate(a,e)}).then(a,function(a){A("failed to asynchronously prepare wasm: "+a);z(a)})}var e={env:a,global:{NaN:NaN,Infinity:Infinity},"global.Math":Math,asm2wasm:fa};L++;c.monitorRunDependencies&&c.monitorRunDependencies(L);if(c.instantiateWasm)try{return c.instantiateWasm(e,
b)}catch(h){return A("Module.instantiateWasm callback failed with error: "+h),!1}c.wasmBinary||"function"!==typeof WebAssembly.instantiateStreaming||za()||"function"!==typeof fetch?f(d):WebAssembly.instantiateStreaming(fetch(N,{credentials:"same-origin"}),e).then(d,function(a){A("wasm streaming compile failed: "+a);A("falling back to ArrayBuffer instantiation");f(d)});return{}}
c.asm=function(a,b){b.memory=ia;b.table=new WebAssembly.Table({initial:352,maximum:352,element:"anyfunc"});b.__memory_base=1024;b.__table_base=0;return Da(b)};var Ea=[function(a,b,d){eval("oBako.color("+a+","+b+","+d+")")},function(a,b,d,f){eval("oBako.fillrect("+a+","+b+","+d+","+f+")")}];ta.push({C:function(){Fa()}});var O={};
function Ga(a){if(Ga.h){var b=B[a>>2];var d=B[b>>2]}else Ga.h=!0,O.USER=O.LOGNAME="web_user",O.PATH="/",O.PWD="/",O.HOME="/home/web_user",O.LANG="C.UTF-8",O._=c.thisProgram,d=K?pa(1024):da(1024),b=K?pa(256):da(256),B[b>>2]=d,B[a>>2]=b;a=[];var f=0,e;for(e in O)if("string"===typeof O[e]){var h=e+"="+O[e];a.push(h);f+=h.length}if(1024<f)throw Error("Environment size exceeded TOTAL_ENV_SIZE!");for(e=0;e<a.length;e++){f=h=a[e];for(var k=d,l=0;l<f.length;++l)E[k++>>0]=f.charCodeAt(l);E[k>>0]=0;B[b+4*e>>
2]=d;d+=h.length+1}B[b+4*a.length>>2]=0}var Ia=[null,[],[]];function Ja(a,b){var d=Ia[a];0===b||10===b?((1===a?ca:A)(ra(d,0)),d.length=0):d.push(b)}var P=0;function Q(){P+=4;return B[P-4>>2]}var Ka={};function ea(){return E.length}function La(){z("OOM")}na("GMT",D,1072880,4);function Ma(a){return Math.log(a)/Math.LN10}function Na(a){return Math.log(a)/Math.LN2}
function R(){function a(a){return(a=a.toTimeString().match(/\(([A-Za-z ]+)\)$/))?a[1]:"GMT"}if(!R.h){R.h=!0;B[Oa()>>2]=60*(new Date).getTimezoneOffset();var b=new Date(2E3,0,1),d=new Date(2E3,6,1);B[Pa()>>2]=Number(b.getTimezoneOffset()!=d.getTimezoneOffset());var f=a(b),e=a(d);f=oa(S(f));e=oa(S(e));d.getTimezoneOffset()<b.getTimezoneOffset()?(B[T()>>2]=f,B[T()+4>>2]=e):(B[T()>>2]=e,B[T()+4>>2]=f)}}function U(a){return 0===a%4&&(0!==a%100||0===a%400)}
function V(a,b){for(var d=0,f=0;f<=b;d+=a[f++]);return d}var W=[31,29,31,30,31,30,31,31,30,31,30,31],X=[31,28,31,30,31,30,31,31,30,31,30,31];function Y(a,b){for(a=new Date(a.getTime());0<b;){var d=a.getMonth(),f=(U(a.getFullYear())?W:X)[d];if(b>f-a.getDate())b-=f-a.getDate()+1,a.setDate(1),11>d?a.setMonth(d+1):(a.setMonth(0),a.setFullYear(a.getFullYear()+1));else{a.setDate(a.getDate()+b);break}}return a}
function S(a,b){for(var d=0,f=0;f<a.length;++f){var e=a.charCodeAt(f);55296<=e&&57343>=e&&(e=65536+((e&1023)<<10)|a.charCodeAt(++f)&1023);127>=e?++d:d=2047>=e?d+2:65535>=e?d+3:d+4}d=Array(d+1);a=na(a,d,0,d.length);b&&(d.length=a);return d}
var Va=c.asm({},{abort:z,setTempRet0:function(a){ha=a},getTempRet0:function(){return ha},invoke_iii:function(a,b,d){var f=F();try{return Qa(a,b,d)}catch(e){H(f);if(e!==e+0&&"longjmp"!==e)throw e;Z(1,0)}},invoke_vi:function(a,b){var d=F();try{Ra(a,b)}catch(f){H(d);if(f!==f+0&&"longjmp"!==f)throw f;Z(1,0)}},invoke_vii:function(a,b,d){var f=F();try{Sa(a,b,d)}catch(e){H(f);if(e!==e+0&&"longjmp"!==e)throw e;Z(1,0)}},invoke_viiii:function(a,b,d,f,e){var h=F();try{Ta(a,b,d,f,e)}catch(k){H(h);if(k!==k+0&&
"longjmp"!==k)throw k;Z(1,0)}},invoke_viiiii:function(a,b,d,f,e,h){var k=F();try{Ua(a,b,d,f,e,h)}catch(l){H(k);if(l!==l+0&&"longjmp"!==l)throw l;Z(1,0)}},___buildEnvironment:Ga,___setErrNo:function(a){c.___errno_location&&(B[c.___errno_location()>>2]=a);return a},___syscall140:function(a,b){P=b;try{var d=Ka.D();Q();var f=Q(),e=Q(),h=Q();(void 0).X(d,f,h);B[e>>2]=d.position;d.F&&0===f&&0===h&&(d.F=null);return 0}catch(k){return z(k),-k.j}},___syscall146:function(a,b){P=b;try{var d=Q(),f=Q(),e=Q();
for(b=a=0;b<e;b++){for(var h=B[f+8*b>>2],k=B[f+(8*b+4)>>2],l=0;l<k;l++)Ja(d,D[h+l]);a+=k}return a}catch(m){return z(m),-m.j}},___syscall54:function(a,b){P=b;return 0},___syscall6:function(a,b){P=b;try{var d=Ka.D();(void 0).close(d);return 0}catch(f){return z(f),-f.j}},__addDays:Y,__arraySum:V,__isLeapYear:U,_abort:function(){c.abort()},_difftime:function(a,b){return a-b},_emscripten_asm_const_iiii:function(a,b,d,f){return Ea[a](b,d,f)},_emscripten_asm_const_iiiii:function(a,b,d,f,e){return Ea[a](b,
d,f,e)},_emscripten_get_heap_size:ea,_emscripten_memcpy_big:function(a,b,d){D.set(D.subarray(b,b+d),a)},_emscripten_resize_heap:function(a){La(a)},_emscripten_run_script:function(a){eval(G(a))},_gettimeofday:function(a){var b=Date.now();B[a>>2]=b/1E3|0;B[a+4>>2]=b%1E3*1E3|0;return 0},_gmtime_r:function(a,b){a=new Date(1E3*B[a>>2]);B[b>>2]=a.getUTCSeconds();B[b+4>>2]=a.getUTCMinutes();B[b+8>>2]=a.getUTCHours();B[b+12>>2]=a.getUTCDate();B[b+16>>2]=a.getUTCMonth();B[b+20>>2]=a.getUTCFullYear()-1900;
B[b+24>>2]=a.getUTCDay();B[b+36>>2]=0;B[b+32>>2]=0;B[b+28>>2]=(a.getTime()-Date.UTC(a.getUTCFullYear(),0,1,0,0,0,0))/864E5|0;B[b+40>>2]=1072880;return b},_llvm_log10_f32:Ma,_llvm_log10_f64:function(a){return Ma(a)},_llvm_log2_f32:Na,_llvm_log2_f64:function(a){return Na(a)},_llvm_trunc_f64:xa,_localtime_r:function(a,b){R();a=new Date(1E3*B[a>>2]);B[b>>2]=a.getSeconds();B[b+4>>2]=a.getMinutes();B[b+8>>2]=a.getHours();B[b+12>>2]=a.getDate();B[b+16>>2]=a.getMonth();B[b+20>>2]=a.getFullYear()-1900;B[b+
24>>2]=a.getDay();var d=new Date(a.getFullYear(),0,1);B[b+28>>2]=(a.getTime()-d.getTime())/864E5|0;B[b+36>>2]=-(60*a.getTimezoneOffset());var f=(new Date(2E3,6,1)).getTimezoneOffset();d=d.getTimezoneOffset();a=(f!=d&&a.getTimezoneOffset()==Math.min(d,f))|0;B[b+32>>2]=a;a=B[T()+(a?4:0)>>2];B[b+40>>2]=a;return b},_longjmp:function(a,b){Z(a,b||1);throw"longjmp";},_mktime:function(a){R();var b=new Date(B[a+20>>2]+1900,B[a+16>>2],B[a+12>>2],B[a+8>>2],B[a+4>>2],B[a>>2],0),d=B[a+32>>2],f=b.getTimezoneOffset(),
e=new Date(b.getFullYear(),0,1),h=(new Date(2E3,6,1)).getTimezoneOffset(),k=e.getTimezoneOffset(),l=Math.min(k,h);0>d?B[a+32>>2]=Number(h!=k&&l==f):0<d!=(l==f)&&(h=Math.max(k,h),b.setTime(b.getTime()+6E4*((0<d?l:h)-f)));B[a+24>>2]=b.getDay();B[a+28>>2]=(b.getTime()-e.getTime())/864E5|0;return b.getTime()/1E3|0},_strftime:function(a,b,d,f){function e(a,b,d){for(a="number"===typeof a?a.toString():a||"";a.length<b;)a=d[0]+a;return a}function h(a,b){return e(a,b,"0")}function k(a,b){function d(a){return 0>
a?-1:0<a?1:0}var e;0===(e=d(a.getFullYear()-b.getFullYear()))&&0===(e=d(a.getMonth()-b.getMonth()))&&(e=d(a.getDate()-b.getDate()));return e}function l(a){switch(a.getDay()){case 0:return new Date(a.getFullYear()-1,11,29);case 1:return a;case 2:return new Date(a.getFullYear(),0,3);case 3:return new Date(a.getFullYear(),0,2);case 4:return new Date(a.getFullYear(),0,1);case 5:return new Date(a.getFullYear()-1,11,31);case 6:return new Date(a.getFullYear()-1,11,30)}}function m(a){a=Y(new Date(a.a+1900,
0,1),a.g);var b=l(new Date(a.getFullYear()+1,0,4));return 0>=k(l(new Date(a.getFullYear(),0,4)),a)?0>=k(b,a)?a.getFullYear()+1:a.getFullYear():a.getFullYear()-1}var p=B[f+40>>2];f={I:B[f>>2],H:B[f+4>>2],f:B[f+8>>2],c:B[f+12>>2],b:B[f+16>>2],a:B[f+20>>2],m:B[f+24>>2],g:B[f+28>>2],Y:B[f+32>>2],G:B[f+36>>2],J:p?G(p):""};d=G(d);p={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S"};for(var n in p)d=d.replace(new RegExp(n,
"g"),p[n]);var q="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Ha="January February March April May June July August September October November December".split(" ");p={"%a":function(a){return q[a.m].substring(0,3)},"%A":function(a){return q[a.m]},"%b":function(a){return Ha[a.b].substring(0,3)},"%B":function(a){return Ha[a.b]},"%C":function(a){return h((a.a+1900)/100|0,2)},"%d":function(a){return h(a.c,2)},"%e":function(a){return e(a.c,2," ")},"%g":function(a){return m(a).toString().substring(2)},
"%G":function(a){return m(a)},"%H":function(a){return h(a.f,2)},"%I":function(a){a=a.f;0==a?a=12:12<a&&(a-=12);return h(a,2)},"%j":function(a){return h(a.c+V(U(a.a+1900)?W:X,a.b-1),3)},"%m":function(a){return h(a.b+1,2)},"%M":function(a){return h(a.H,2)},"%n":function(){return"\n"},"%p":function(a){return 0<=a.f&&12>a.f?"AM":"PM"},"%S":function(a){return h(a.I,2)},"%t":function(){return"\t"},"%u":function(a){return(new Date(a.a+1900,a.b+1,a.c,0,0,0,0)).getDay()||7},"%U":function(a){var b=new Date(a.a+
1900,0,1),d=0===b.getDay()?b:Y(b,7-b.getDay());a=new Date(a.a+1900,a.b,a.c);return 0>k(d,a)?h(Math.ceil((31-d.getDate()+(V(U(a.getFullYear())?W:X,a.getMonth()-1)-31)+a.getDate())/7),2):0===k(d,b)?"01":"00"},"%V":function(a){var b=l(new Date(a.a+1900,0,4)),d=l(new Date(a.a+1901,0,4)),e=Y(new Date(a.a+1900,0,1),a.g);return 0>k(e,b)?"53":0>=k(d,e)?"01":h(Math.ceil((b.getFullYear()<a.a+1900?a.g+32-b.getDate():a.g+1-b.getDate())/7),2)},"%w":function(a){return(new Date(a.a+1900,a.b+1,a.c,0,0,0,0)).getDay()},
"%W":function(a){var b=new Date(a.a,0,1),d=1===b.getDay()?b:Y(b,0===b.getDay()?1:7-b.getDay()+1);a=new Date(a.a+1900,a.b,a.c);return 0>k(d,a)?h(Math.ceil((31-d.getDate()+(V(U(a.getFullYear())?W:X,a.getMonth()-1)-31)+a.getDate())/7),2):0===k(d,b)?"01":"00"},"%y":function(a){return(a.a+1900).toString().substring(2)},"%Y":function(a){return a.a+1900},"%z":function(a){a=a.G;var b=0<=a;a=Math.abs(a)/60;return(b?"+":"-")+String("0000"+(a/60*100+a%60)).slice(-4)},"%Z":function(a){return a.J},"%%":function(){return"%"}};
for(n in p)0<=d.indexOf(n)&&(d=d.replace(new RegExp(n,"g"),p[n](f)));n=S(d,!1);if(n.length>b)return 0;E.set(n,a);return n.length-1},_strptime:function(a,b,d){function f(){function a(a,b,d){return"number"!==typeof a||isNaN(a)?b:a>=b?a<=d?a:d:b}return{year:a(B[d+20>>2]+1900,1970,9999),month:a(B[d+16>>2],0,11),day:a(B[d+12>>2],1,31),hour:a(B[d+8>>2],0,23),min:a(B[d+4>>2],0,59),l:a(B[d>>2],0,59)}}for(var e=G(b),h=0;25>h;++h)e=e.replace(new RegExp("\\"+"\\!@#$^&*()+=-[]/{}|:<>?,."[h],"g"),"\\"+"\\!@#$^&*()+=-[]/{}|:<>?,."[h]);
b={"%A":"%a","%B":"%b","%c":"%a %b %d %H:%M:%S %Y","%D":"%m\\/%d\\/%y","%e":"%d","%F":"%Y-%m-%d","%h":"%b","%R":"%H\\:%M","%r":"%I\\:%M\\:%S\\s%p","%T":"%H\\:%M\\:%S","%x":"%m\\/%d\\/(?:%y|%Y)","%X":"%H\\:%M\\:%S"};for(var k in b)e=e.replace(k,b[k]);h={"%a":"(?:Sun(?:day)?)|(?:Mon(?:day)?)|(?:Tue(?:sday)?)|(?:Wed(?:nesday)?)|(?:Thu(?:rsday)?)|(?:Fri(?:day)?)|(?:Sat(?:urday)?)","%b":"(?:Jan(?:uary)?)|(?:Feb(?:ruary)?)|(?:Mar(?:ch)?)|(?:Apr(?:il)?)|May|(?:Jun(?:e)?)|(?:Jul(?:y)?)|(?:Aug(?:ust)?)|(?:Sep(?:tember)?)|(?:Oct(?:ober)?)|(?:Nov(?:ember)?)|(?:Dec(?:ember)?)",
"%C":"\\d\\d","%d":"0[1-9]|[1-9](?!\\d)|1\\d|2\\d|30|31","%H":"\\d(?!\\d)|[0,1]\\d|20|21|22|23","%I":"\\d(?!\\d)|0\\d|10|11|12","%j":"00[1-9]|0?[1-9](?!\\d)|0?[1-9]\\d(?!\\d)|[1,2]\\d\\d|3[0-6]\\d","%m":"0[1-9]|[1-9](?!\\d)|10|11|12","%M":"0\\d|\\d(?!\\d)|[1-5]\\d","%n":"\\s","%p":"AM|am|PM|pm|A\\.M\\.|a\\.m\\.|P\\.M\\.|p\\.m\\.","%S":"0\\d|\\d(?!\\d)|[1-5]\\d|60","%U":"0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53","%W":"0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53","%w":"[0-6]","%y":"\\d\\d","%Y":"\\d\\d\\d\\d",
"%%":"%","%t":"\\s"};var l={O:0,N:1,S:2,K:3,T:4,R:5,P:6,L:7,W:8,V:9,U:10,M:11};k={v:0,s:1,A:2,B:3,w:4,o:5,u:6};b={s:0,A:1,B:2,w:3,o:4,u:5,v:6};for(var m in h)e=e.replace(m,"("+m+h[m]+")");var p=[];for(h=e.indexOf("%");0<=h;h=e.indexOf("%"))p.push(e[h+1]),e=e.replace(new RegExp("\\%"+e[h+1],"g"),"");var n=(new RegExp("^"+e,"i")).exec(G(a));if(n){m=f();h=function(a){a=p.indexOf(a);if(0<=a)return n[a+1]};if(e=h("S"))m.l=parseInt(e);if(e=h("M"))m.min=parseInt(e);if(e=h("H"))m.hour=parseInt(e);else if(e=
h("I")){var q=parseInt(e);if(e=h("p"))q+="P"===e.toUpperCase()[0]?12:0;m.hour=q}if(e=h("Y"))m.year=parseInt(e);else if(e=h("y"))q=parseInt(e),q=(e=h("C"))?q+100*parseInt(e):q+(69>q?2E3:1900),m.year=q;if(e=h("m"))m.month=parseInt(e)-1;else if(e=h("b"))m.month=l[e.substring(0,3).toUpperCase()]||0;if(e=h("d"))m.day=parseInt(e);else if(e=h("j"))for(k=parseInt(e),b=U(m.year),l=0;12>l;++l)e=V(b?W:X,l-1),k<=e+(b?W:X)[l]&&(m.day=k-e);else if(e=h("a"))if(l=e.substring(0,3).toUpperCase(),e=h("U"))k=k[l],b=
parseInt(e),l=new Date(m.year,0,1),k=0===l.getDay()?Y(l,k+7*(b-1)):Y(l,7-l.getDay()+k+7*(b-1)),m.day=k.getDate(),m.month=k.getMonth();else if(e=h("W"))k=b[l],b=parseInt(e),l=new Date(m.year,0,1),k=1===l.getDay()?Y(l,k+7*(b-1)):Y(l,7-l.getDay()+1+k+7*(b-1)),m.day=k.getDate(),m.month=k.getMonth();m=new Date(m.year,m.month,m.day,m.hour,m.min,m.l,0);B[d>>2]=m.getSeconds();B[d+4>>2]=m.getMinutes();B[d+8>>2]=m.getHours();B[d+12>>2]=m.getDate();B[d+16>>2]=m.getMonth();B[d+20>>2]=m.getFullYear()-1900;B[d+
24>>2]=m.getDay();B[d+28>>2]=V(U(m.getFullYear())?W:X,m.getMonth()-1)+m.getDate()-1;B[d+32>>2]=0;return a+S(n[0]).length-1}return 0},_tzset:R,abortOnCannotGrowMemory:La,flush_NO_FILESYSTEM:function(){var a=c._fflush;a&&a(0);Ia[1].length&&Ja(1,10);Ia[2].length&&Ja(2,10)},tempDoublePtr:1072976,DYNAMICTOP_PTR:C},buffer);c.asm=Va;var Fa=c.___emscripten_environ_constructor=function(){return c.asm.___emscripten_environ_constructor.apply(null,arguments)};
c.___errno_location=function(){return c.asm.___errno_location.apply(null,arguments)};var Pa=c.__get_daylight=function(){return c.asm.__get_daylight.apply(null,arguments)},Oa=c.__get_timezone=function(){return c.asm.__get_timezone.apply(null,arguments)},T=c.__get_tzname=function(){return c.asm.__get_tzname.apply(null,arguments)};c._dukweb_close=function(){return c.asm._dukweb_close.apply(null,arguments)};c._dukweb_eval=function(){return c.asm._dukweb_eval.apply(null,arguments)};
c._dukweb_is_open=function(){return c.asm._dukweb_is_open.apply(null,arguments)};c._dukweb_open=function(){return c.asm._dukweb_open.apply(null,arguments)};c._free=function(){return c.asm._free.apply(null,arguments)};c._llvm_bswap_i16=function(){return c.asm._llvm_bswap_i16.apply(null,arguments)};c._llvm_bswap_i32=function(){return c.asm._llvm_bswap_i32.apply(null,arguments)};var pa=c._malloc=function(){return c.asm._malloc.apply(null,arguments)};
c._memcpy=function(){return c.asm._memcpy.apply(null,arguments)};c._memmove=function(){return c.asm._memmove.apply(null,arguments)};c._memset=function(){return c.asm._memset.apply(null,arguments)};c._realloc=function(){return c.asm._realloc.apply(null,arguments)};c._saveSetjmp=function(){return c.asm._saveSetjmp.apply(null,arguments)};c._sbrk=function(){return c.asm._sbrk.apply(null,arguments)};var Z=c._setThrew=function(){return c.asm._setThrew.apply(null,arguments)};
c._testSetjmp=function(){return c.asm._testSetjmp.apply(null,arguments)};c.establishStackSpace=function(){return c.asm.establishStackSpace.apply(null,arguments)};var ma=c.stackAlloc=function(){return c.asm.stackAlloc.apply(null,arguments)},H=c.stackRestore=function(){return c.asm.stackRestore.apply(null,arguments)},F=c.stackSave=function(){return c.asm.stackSave.apply(null,arguments)};c.dynCall_dd=function(){return c.asm.dynCall_dd.apply(null,arguments)};
c.dynCall_ddd=function(){return c.asm.dynCall_ddd.apply(null,arguments)};c.dynCall_ii=function(){return c.asm.dynCall_ii.apply(null,arguments)};var Qa=c.dynCall_iii=function(){return c.asm.dynCall_iii.apply(null,arguments)};c.dynCall_iiii=function(){return c.asm.dynCall_iiii.apply(null,arguments)};var Ra=c.dynCall_vi=function(){return c.asm.dynCall_vi.apply(null,arguments)},Sa=c.dynCall_vii=function(){return c.asm.dynCall_vii.apply(null,arguments)};
c.dynCall_viii=function(){return c.asm.dynCall_viii.apply(null,arguments)};var Ta=c.dynCall_viiii=function(){return c.asm.dynCall_viiii.apply(null,arguments)},Ua=c.dynCall_viiiii=function(){return c.asm.dynCall_viiiii.apply(null,arguments)};c.asm=Va;c.ccall=la;c.cwrap=function(a,b,d,f){d=d||[];var e=d.every(function(a){return"number"===a});return"string"!==b&&e&&!f?ka(a):function(){return la(a,b,d,arguments,f)}};
function y(a){this.name="ExitStatus";this.message="Program terminated with exit("+a+")";this.status=a}y.prototype=Error();y.prototype.constructor=y;M=function Wa(){c.calledRun||Xa();c.calledRun||(M=Wa)};
function Xa(){function a(){if(!c.calledRun&&(c.calledRun=!0,!ja)){K||(K=!0,J(ta));J(ua);if(c.onRuntimeInitialized)c.onRuntimeInitialized();if(c.postRun)for("function"==typeof c.postRun&&(c.postRun=[c.postRun]);c.postRun.length;){var a=c.postRun.shift();va.unshift(a)}J(va)}}if(!(0<L)){if(c.preRun)for("function"==typeof c.preRun&&(c.preRun=[c.preRun]);c.preRun.length;)wa();J(sa);0<L||c.calledRun||(c.setStatus?(c.setStatus("Running..."),setTimeout(function(){setTimeout(function(){c.setStatus("")},1);
a()},1)):a())}}c.run=Xa;function z(a){if(c.onAbort)c.onAbort(a);void 0!==a?(ca(a),A(a),a=JSON.stringify(a)):a="";ja=!0;throw"abort("+a+"). Build with -s ASSERTIONS=1 for more info.";}c.abort=z;if(c.preInit)for("function"==typeof c.preInit&&(c.preInit=[c.preInit]);0<c.preInit.length;)c.preInit.pop()();c.noExitRuntime=!0;Xa();