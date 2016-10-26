

export class Message {
  public text: string = '';
  public x: number = 0;
  public y: number = 0;
  public dx: number = 0;
  public dy: number = 0;
  public width: number = 0;
  public height: number = 0;
  public created: number; // 1 * Date

  public physBody: any = null;
  public density: number = null;
  public angle: number = 0;

  constructor(args: any){
    if(!args) args = {};
    this.text = args.text || '';
    this.x = args.x || 0;
    this.y = args.y || 0;
    this.dx = args.dx || 0;
    this.dy = args.dy || 0;
    this.width = args.width || 0;
    this.height = args.height || 0;
    this.created = new Date().getTime();

    // transform so the point is in the center
    this.x += this.width / 2;
    this.y -= this.height / 2; // height is from top-left, so i guess minus?

    specials.forEach(special => {
      if(this.text.match(special.text)) {
        special.del(this);
      }
    });
  }

  serializeable() {
    return {
      text: this.text,
      x: this.x - this.width / 2,
      y: this.y + this.height / 2,
      dx: this.dx,
      dy: this.dy,
      width: this.width,
      height: this.height,
      angle: this.angle,
    }
  }

  // accelerate(ddx: number, ddy: number) {
  //   this.dx += ddx;
  //   this.dy += ddy;
  // }
  //
  // tick() {
  //   this.x += this.dx;
  //   this.y += this.dy;
  //   if(this.y - this.height < 0) this.y = 0 + this.height;
  // }

}

const specials = [
  {
    text: /trebuchet/,
    del: (m: Message) => {
      m.dx = (Math.random() < 0.5 ? 1 : -1) * 6;
      m.dy = 6;
    },
  },
  {
    text: /bullet/,
    del: (m: Message) => {
      var th = Math.random() * 2 * 3.14159;
      m.dx = 9 * Math.cos(th);
      m.dy = 9 * Math.sin(th);
    },
  },
  {
    text: /left/,
    del: (m: Message) => {
      m.dx = -5;
    },
  },
  {
    text: /right/,
    del: (m: Message) => {
      m.dx = 5;
    },
  },
  {
    text: /up/,
    del: (m: Message) => {
      m.dy = 5;
    },
  },
  {
    text: /down/,
    del: (m: Message) => {
      m.dy = -5;
    },
  },
  {
    text: /heavy/,
    del: (m: Message) => {
      m.density = 5;
    },
  },
  {
    text: /light/,
    del: (m: Message) => {
      m.density = 0.2;
    },
  },
];
