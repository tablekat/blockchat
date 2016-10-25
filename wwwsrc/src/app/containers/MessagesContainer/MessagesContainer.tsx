import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { MessageComponent } from "../../components/MessageComponent/MessageComponent";
import { Message } from '../../components/MessageComponent/Message';
import * as Actions from '../../actions';

interface MessagesContainerProps {
    messages: Message[],
}

interface MessagesContainerState {
}

export class MessagesContainer extends React.Component<MessagesContainerProps, MessagesContainerState> {

  constructor(props, context){
    super(props, context);
  }

  render() {
      return (
        <div>
          { this.props.messages.map((message, i) => {
            return (
              <MessageComponent msg={message} key={'msg' + i} />
            );
          })}
        </div>
      );
  }
}
