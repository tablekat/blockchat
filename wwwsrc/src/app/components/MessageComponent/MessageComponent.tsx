import * as React from "react";
import { Message } from './Message';

export interface MessageObjectProps {
  msg: Message;
}

export class MessageComponent extends React.Component<MessageObjectProps, {}> {
  render() {

    var style = {
      position: 'absolute',
      top: this.props.msg.y,
      left: this.props.msg.x,
    };

    return (
      <div className="display-message" style={style}>
        {this.props.msg.text}
      </div>
    );
  }
}
