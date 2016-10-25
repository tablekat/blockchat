
import { Message } from './Message';
import { EventEmitter } from 'events';
var Matter = require('matter-js');

console.log(Matter.World);

const TICK_RATE = 30;
const GRAVITY = -0.2;
const MAX_AGE = 5000; //ms

export class MessageSystem extends EventEmitter {

  public messages: Message[] = [];
  private engine: any;

  constructor() {
    super();

    this.engine = Matter.Engine.create();

    this.tick();
  }

  add(msg: Message) {
    if(this.messages.length > 2000) return;
    this.messages.push(msg);
  }


  tick() {

    var now = new Date().getTime();
    var newMessages = [];
    var msg;
    for(var i=0; i < this.messages.length; ++i){
      msg = this.messages[i];
      msg.accelerate(0, GRAVITY);
      msg.tick();
      if(now - msg.created < MAX_AGE){
        newMessages.push(msg);
      }
    }
    this.messages = newMessages;

    this.emit('update');

    setTimeout(() => this.tick(), 1000 / TICK_RATE);
  }

}
