import React ,{ useState } from "react"
import PropTypes from "prop-types"
import axios from 'axios'
import { csrfToken } from 'rails-ujs'


// bootstrapのインポート
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalTitle from 'react-bootstrap/ModalTitle'
import Form from 'react-bootstrap/Form'

class ButtonForCategory extends React.Component {

  constructor(props) {
    super(props);
    this.change_show_boolean = this.change_show_boolean.bind(this);
  }

  change_show_boolean(){
    this.props.changeboolean();
  }

  render(){
    return (
      <>
        {/* カテゴリーを保存するポップアップ表示のためのボタン */}
        <div className="add-category-box">
          <div className="add-category-button">
            <p>カテゴリー追加</p>
              <span className="category-add-button" onClick={this.change_show_boolean}>
                <i className="far fa-plus-square fas fa-8x"></i>
              </span>
          </div>
        </div>
      </>
    );
  }
}

export default ButtonForCategory
