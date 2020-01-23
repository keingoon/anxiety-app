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

class CategoryFormPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };

    this.on_change_name = this.on_change_name.bind(this);
    this.on_change_show = this.on_change_show.bind(this);
    this.on_send_category_form = this.on_send_category_form.bind(this);
    this.category_form_operation = this.category_form_operation.bind(this);

    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
  }

  //formに入力されたcategoryの名前を取得して、state.nameを更新するメソッド
  on_change_name(e) {
    this.setState({name: e.target.value});
  }

  //親コンポーネントのstate.showの真偽を逆転させるメソッド
  on_change_show(){
    this.props.change_show_boolean();
  }

  //親コンポーネントのstate.loadingの真偽を逆転させるメソッド
  on_change_loading(){
    this.props.change_loading_boolean();
  }

  //非同期postリクエストで、state.nameを送り、親コンポーネントのstate.categoriesをレスポンスを通して更新するメソッド
  on_send_category_form(){
    name = this.state.name;
    this.props.category_form_send(name);
  }

  //categoryのボタン押したら走る処理たち（ajaxのpostリクエストする処理、showのboolean変える処理）
  category_form_operation(){
    this.on_change_show();
    this.on_send_category_form();
  }

  render(){
    //親コンポーネントのthis.state.loadingを受け取った
    const loading = this.props.loading;
    // categoryのvalueを保持するためのname
    const name = this.state.name;
    //親コンポーネントのポップアップを表示するか否か
    const show = this.props.show;

    return (
      <Modal show={show} onHide={this.on_change_show}>
        <Modal.Header closeButton>
          <Modal.Title>カテゴリーの新規登録</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form acceptCharset="UTF-8">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>カテゴリー名</Form.Label>
              <Form.Control value={name} placeholder="カテゴリーを入力してください" onChange={this.on_change_name} />
              <Form.Text className="text-muted">
                自由にカテゴリーを入力してください
              </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={this.category_form_operation} disabled={loading}>
              登録
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.on_change_show}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CategoryFormPopup;
