import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { Message } from '../../components/MessageComponent/Message';
import { ControlsComponent } from '../../components/ControlsComponent/ControlsComponent';
import { MessagesContainer } from '../MessagesContainer/MessagesContainer';
import * as Actions from '../../actions';

declare var socket: any;

var styles = {
  container: {
    position: 'fixed',
    left: 0, right: 0, bottom: 0, top: 0,
    overflow: 'hidden',
  },
};

interface PageContainerProps {

}

interface PageContainerState {
    messages?: Message[];
}

class PageContainer extends React.Component<PageContainerProps, PageContainerState> {

  constructor(props, context){
    super(props, context);

    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    socket.on('new-message', ({ msg }) => {
      this.onNewMessage(msg);
    });

    socket.on('update-messages', ({ msgs }) => {
      this.setState({
        messages: msgs,
      });
    });
  }

  createMessage(msg: Message) {
    socket.emit('new-message', { msg });
    this.onNewMessage(msg);
  }

  onNewMessage(msg: Message) {
    this.setState({
      messages: [...this.state.messages, msg],
    });
  }

  render() {
      return (
        <div style={styles.container}>
          <MessagesContainer messages={this.state.messages} />
          <ControlsComponent createMessage={(msg) => this.createMessage(msg)} />
        </div>
      );
  }
}


// function mapStateToProps(state, ownProps) {
//     return {
//         greetings: state.greetings,
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         onAddGreeting: (text) => {
//             dispatch(Actions.addGreeting(text))
//         },
//         onClearGreetings: () => {
//             dispatch(Actions.clearGreetings())
//         },
//         onReverseGreetings: () => {
//             dispatch(Actions.reverseGreetings())
//         },
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(PageContainer);

export default PageContainer;
