import * as React from "react";
import { Message, SpecialStyles } from './Message';

export interface MessageObjectProps {
  msg: Message;
}

export class MessageComponent extends React.Component<MessageObjectProps, {}> {
  render() {

    var angle = (this.props.msg.angle || 0) / Math.PI * 180;

    var style = (Object as any).assign({}, {
      position: 'absolute',
      top: window.innerHeight - this.props.msg.y,
      left: this.props.msg.x,
      zIndex: 100,
      width: this.props.msg.width + 2,
      boxSizing: 'border-box',
      transformOrigin: 'center',
      transform: `rotate(${angle}deg)`,
    }, SpecialStyles(this.props.msg));

    return (
      <div className="display-message" style={style}>
        {this.props.msg.text}
      </div>
    );
  }
}
