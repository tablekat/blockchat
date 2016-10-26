
import { Message } from './Message';
import { EventEmitter } from 'events';
var Matter = require('matter-js');
var { World, Engine, Bodies, Body } = Matter;

const TICK_RATE = 30;
const GRAVITY = -0.6; //-0.2;
const MAX_AGE = 60000; //ms

export class MessageSystem extends EventEmitter {

  public messages: Message[] = [];
  private engine: any;

  constructor() {
    super();

    this.engine = Engine.create();

    this.engine.world.gravity.y = GRAVITY;
    var floor = Bodies.rectangle(2000, 10/*-20*/, 4000, /*20*/100, { isStatic: true }); // along y = 0 axis as platform.
    World.add(this.engine.world, floor);

    this.tick();
  }

  add(msg: Message) {
    if(this.messages.length > 2000) return;
    this.messages.push(msg);

    var opts: any = {};
    //opts.force = { x: msg.dx / 300, y: msg.dy / 300 }; // can't set initial velocity mang...
    if(msg.density !== null) opts.density = msg.density;

    var rect = Bodies.rectangle(msg.x, msg.y, msg.width, msg.height, opts);
    Body.setVelocity(rect, { x: msg.dx, y: msg.dy });

    msg.physBody = rect; // Hopefully this object will get reused!
    World.add(this.engine.world, rect);
  }


  tick() {

    Engine.update(this.engine, 1000 / TICK_RATE);

    var now = new Date().getTime();
    var newMessages = [];
    var msg: Message;
    for(var i=0; i < this.messages.length; ++i){
      msg = this.messages[i];
      msg.x = msg.physBody.position.x;
      msg.y = msg.physBody.position.y;
      msg.angle = msg.physBody.angle;
      if(now - msg.created < MAX_AGE){
        newMessages.push(msg);
      }else{
        World.remove(this.engine.world, msg.physBody);
      }
    }
    this.messages = newMessages;
    //if(Math.random() < 0.01) console.log(this.messages.map(z => z.y));

    this.emit('update');

    setTimeout(() => this.tick(), 1000 / TICK_RATE);
  }

}
