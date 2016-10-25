import * as React from "react";
import { Message, SpecialStyles } from '../MessageComponent/Message';

const OFFSET_MOUSE = 15;

var styles = {
  container: {
    position: 'absolute',
    padding: 10,
    borderRadius: 7,
    border: '1px solid #ccc',
    background: '#eee',
    display: 'flex',
    alignItems: 'stretch',
  },
  hiddenSizer: {
    display: 'inline-block',
    position: 'absolute',
    opacity: 0, // todo: visibility none
    // Style this the same as normal messages size-wise!!!!!!
  },
  xButton: {
    fontSize: '1.3rem',
    paddingLeft: 8,
    textDecoration: 'none',
    color: '#444',
  },
};

export interface ControlsComponentProps {
  createMessage: (Message) => void;
}
interface ControlsComponentState {
  newMessage?: Message;
  mouseX?: number;
  mouseY?: number;
  opened?: boolean;
}

export class ControlsComponent extends React.Component<ControlsComponentProps, ControlsComponentState> {

  private mouseMoveListener: any = null;
  private mouseDownListener: any = null;
  private hiddenSizer: any;
  private textElem: any;

  constructor(props, context){
    super(props, context);

    this.state = {
      newMessage: new Message(),
      mouseX: 0,
      mouseY: 0,
      opened: false,
    };
  }

  componentDidMount() {
    this.mouseMoveListener = (event) => {
      if(!this.state.opened){
        this.setState({
          mouseX: event.pageX,
          mouseY: event.pageY,
        });
      }
    };
    this.mouseDownListener = (event) => {
      this.setState({
        opened: !this.state.opened,
        mouseX: event.pageX,
        mouseY: event.pageY,
      });
    };
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mousedown', this.mouseDownListener);
  }

  componentWillUnmount() {
    if(this.mouseMoveListener){
      document.removeEventListener('mousemove', this.mouseMoveListener);
      this.mouseMoveListener = null;
    }
    if(this.mouseDownListener){
      document.removeEventListener('mousedown', this.mouseDownListener);
      this.mouseDownListener = null;
    }
  }

  componentDidUpdate() {
    // Update hidden representation, dont need to trigger update
    this.state.newMessage.width = this.hiddenSizer.offsetWidth;
    this.state.newMessage.height = this.hiddenSizer.offsetHeight;
  }


  createMessage(msg: Message){
    if(!msg.text) return;
    msg.x = this.state.mouseX + OFFSET_MOUSE + styles.container.padding;
    // Make bottom left of screen be (0, 0)
    msg.y = window.innerHeight - (this.state.mouseY + OFFSET_MOUSE + styles.container.padding);

    this.props.createMessage(msg);

    this.setState({
      newMessage: new Message(),
    });
    this.textElem.focus();
  }

  handleKeyPress(event) {
    if(event.key === 'Enter'){
      this.createMessage(this.state.newMessage);
    }
  }
  handleChange(event) {
    this.setState({
      newMessage: this.state.newMessage.setText(event.target.value),
    });
  }
  handleManualClose() {
    this.setState({
      opened: false,
    });
  }

  render() {

    var style = (Object as any).assign({}, styles.container, {
      top: this.state.mouseY + OFFSET_MOUSE,
      left: this.state.mouseX + OFFSET_MOUSE,
      opacity: this.state.opened ? 1 : 0.15,
    });

    var specialStyles = SpecialStyles(this.state.newMessage);
    var sizeStyle = (Object as any).assign({}, styles.hiddenSizer, specialStyles);

    return (
      <div
        style={style}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <input
          type="text"
          value={this.state.newMessage.text}
          onChange={ (event) => this.handleChange(event) }
          onKeyPress={(event) => this.handleKeyPress(event) }
          className="display-message"
          style={specialStyles}
          ref={(h) => this.textElem = h}
        />
        <button
          className="btn"
          onClick={ () => this.createMessage(this.state.newMessage) }
        >
          Send
        </button>
        <div className="display-message" style={styles.hiddenSizer} ref={(h) => this.hiddenSizer = h}>
          {this.state.newMessage.text}
        </div>
        <a
          href="#"
          onMouseDown={e => {
            this.handleManualClose();
            e.preventDefault();
          }}
          style={styles.xButton}
        >
          ×
        </a>
      </div>
    );
  }
}
