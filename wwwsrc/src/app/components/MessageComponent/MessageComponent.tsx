import * as React from "react";
import { Message, SpecialStyles } from './Message';

export interface MessageObjectProps {
  msg: Message;
}

export class MessageComponent extends React.Component<MessageObjectProps, {}> {
  render() {

    var style = (Object as any).assign({}, {
      position: 'absolute',
      top: window.innerHeight - this.props.msg.y,
      left: this.props.msg.x,
      zIndex: 100,
    }, SpecialStyles(this.props.msg));

    return (
      <div className="display-message" style={style}>
        {this.props.msg.text}
      </div>
    );
  }
}
