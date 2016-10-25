
import { Message } from './Message';
import { EventEmitter } from 'events';

const TICK_RATE = 30;
const GRAVITY = 0.2;

export class MessageSystem extends EventEmitter {

  public messages: Message[] = [];

  constructor() {
    super();

    this.tick();
  }

  add(msg: Message) {
    this.messages.push(msg);
  }


  tick() {

    for(var i=0; i < this.messages.length; ++i){
      this.messages[i].accelerate(0, GRAVITY);
      this.messages[i].tick();
    }

    this.emit('update');

    setTimeout(() => this.tick(), 1000 / TICK_RATE);
  }

}
