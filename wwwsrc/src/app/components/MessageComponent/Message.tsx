

export class Message {

  public width: number = 0;
  public height: number = 0;

  constructor(public text: string = '',
              public x: number = 0,
              public y: number = 0,
              public dx: number = 0,
              public dy: number = 0){

  }

  setText(t: string){
    this.text = t;
    return this;
  }

  setSize(width: number, height: number){
    this.width = width;
    this.height = height;
    return this;
  }

}

export function SpecialStyles(msg: Message): any {
  if(msg.text.match(/fancy/)) {
    return {
      fontFamily: 'Lobster',
    };
  }

  if(msg.text.match(/(robot|bee+p|boop)/)) {
    return {
      fontFamily: 'Orbitron',
    };
  }

  if(msg.text.match(/(pencil)/)) {
    return {
      fontFamily: 'Homemade Apple',
    };
  }

  if(msg.text.match(/(heavy)/)) {
    return {
      fontWeight: 'bold',
    };
  }

  if(msg.text.match(/(light)/)) {
    return {
      opacity: 0.7,
    };
  }

}
