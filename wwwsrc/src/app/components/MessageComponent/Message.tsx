

export class Message {

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

}
