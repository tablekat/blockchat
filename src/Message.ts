

export class Message {
  public text: string = '';
  public x: number = 0;
  public y: number = 0;
  public dx: number = 0;
  public dy: number = 0;
  public width: number = 0;
  public height: number = 0;

  constructor(args: any){
    if(!args) args = {};
    this.text = args.text || '';
    this.x = args.x || 0;
    this.y = args.y || 0;
    this.dx = args.dx || 0;
    this.dy = args.dy || 0;
    this.width = args.width || 0;
    this.height = args.height || 0;
  }

  accelerate(ddx: number, ddy: number) {
    this.dx += ddx;
    this.dy += ddy;
  }

  tick() {
    this.x += this.dx;
    this.y += this.dy;
  }

}
