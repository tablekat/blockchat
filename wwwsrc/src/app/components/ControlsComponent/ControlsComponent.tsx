import * as React from "react";
import { Message } from '../MessageComponent/Message';

var styles = {
  container: {
    position: 'absolute',
  },
  hiddenSizer: {
    opacity: 0.1, // todo: visibility none
    // Style this the same as normal messages!!!!!!
  }
};

export interface ControlsComponentProps {
  createMessage: (Message) => void;
}
interface ControlsComponentState {
    newMessage?: Message;
}

export class ControlsComponent extends React.Component<ControlsComponentProps, ControlsComponentState> {


  constructor(props, context){
    super(props, context);

    this.state = {
      newMessage: new Message(),
    }
  }

  handleChange(event) {
    this.setState({
      newMessage: this.state.newMessage.setText(event.target.value),
    });
  }

  createMessage(msg: Message){
    this.props.createMessage(msg);

    this.setState({
      newMessage: new Message(),
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.newMessage.text}
          onChange={ (event) => this.handleChange(event) }
        />
        <button onClick={ () => this.createMessage(this.state.newMessage) }>
          Add Greeting: {this.state.newMessage.text}
        </button>
        <div style={styles.hiddenSizer}>
          {this.state.newMessage.text}
        </div>
      </div>
    );
  }
}
