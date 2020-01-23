import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'
import { CSSTransition } from 'react-transition-group'

//アニメーションをするscssファイルをインポート
import Style from './FormMessage.scss'

// bootstrapのインポート
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'


class FormMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const form_message = this.props.form_message;
    const form_message_content = this.props.form_message_content;
    return (
      <>
        <CSSTransition
          in={form_message}
          timeout={300}
          classNames = "form-message-part"
          unmountOnExit
        >
          <Alert variant="success">{form_message_content}</Alert>
        </CSSTransition>
      </>
    );
  }
}

export default FormMessage
