export function setup(): void {}
var c = 0
export function loop(): void{
    color(0,0,0)
    fillrect(0,0,128,128)
    color(255,255,255)
    text("Hello World", 10, c%128)
    c ++
}
