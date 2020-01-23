import React from "react"
import Style from './ErrorMessages.scss'
import Alert from 'react-bootstrap/Alert'
import { CSSTransition } from 'react-transition-group';

class ErrorMessages extends React.Component {
  constructor(props) {
    super(props);
    this.change_error_state_false = this.change_error_state_false.bind(this);
  }

  change_error_state_false(){
    this.props.change_error_state_false()
  }

  render() {
    const error_messages = this.props.error_messages;
    const error = this.props.error;
    return (
      // どうやらタグは必ずつけないとエラーになるらしい。今回はdivタグをつけた。
      <>
        <CSSTransition
          in={error}
          timeout={300}
          classNames = "error-part"
          unmountOnExit
        >
          <Alert
            variant="danger"
            dismissible
            onClose={this.change_error_state_false}
          >
            {error_messages}
          </Alert>
        </CSSTransition>
      </>
    );
  }
}

export default ErrorMessages
