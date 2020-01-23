import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'
//クロスサイトフォージェリを防ぐためのプラグイン
import { csrfToken } from 'rails-ujs'
//historyを使えるようにするためのプラグイン
import { withRouter } from 'react-router'

//子コンポーネントのインポート
import ErrorBoundary from './ErrorBoundary'
import CategoryAll from './CategoryAll'
import ButtonForCategory from './ButtonForCategory'
import CategoryFormPopup from './CategoryFormPopup'
import ErrorMessages from './ErrorMessages'
import FormMessage from './FormMessage'

// bootstrapのインポート
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class AnxietiesNewForm extends React.Component {
  constructor(props) {
    super(props);
    //あとでform部分を書き換えてええええええうええええええ

    // show：モーダルの表示・非表示
    // category_id：カテゴリー選択のところのラジオボタンのvalue
    // categories：categoryのidとnameを含んだ配列
    // loading：categoryのformのボタンが押せるか、押せないかの成否
    // form_message_**：formをホバーしてるかしていないかの正誤
    this.state = {
      content: "",
      thinking: "",
      physical: "",
      action: "",
      show: false,
      category_id: null,
      categories: this.props.categories,
      loading: false,
      anxiety_loading: false,
      error_messages: "",
      error: false,
      form_messages: {anxiety: false, thinking: false, physical: false, action: false}
    };

    //ここもぐっちゃぐちゃだなあ。アロー関数による書き換えとかしよう
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    this.anxiety_form_send = this.anxiety_form_send.bind(this);
    this.on_form_change = this.on_form_change.bind(this);
    this.change_show_boolean = this.change_show_boolean.bind(this);
    this.change_loading_boolean = this.change_loading_boolean.bind(this);
    this.change_anxiety_loading_boolean = this.change_anxiety_loading_boolean.bind(this);
    this.category_form_send = this.category_form_send.bind(this);    
    this.change_error_state_false = this.change_error_state_false.bind(this);
    this.change_form_message_boolean = this.change_form_message_boolean.bind(this);
    this.get_category_id = this.get_category_id.bind(this);
    this.anxiety_form_operation = this.anxiety_form_operation.bind(this);
  }

  // まだ未完成。anxietesのフォームを送るajaxのメソッド
  anxiety_form_send() {
    axios.post('/api/v1/anxieties', {
      anxiety: {
        content: this.state.content,
        thinking: this.state.thinking,
        physical: this.state.physical,
        action: this.state.action,
        category_id: this.state.category_id
      }
    })
    .then(response => {
      console.log("成功");
      //axios.postが送られたら入力欄やカテゴリー選択、ボタンが押されている状態を全部空にする
      this.setState({content: "", thinking: "", physical: "", action: "", category_id: null, anxiety_loading: false});
      //AnxietiesIndexに遷移する
      this.props.history.push('/index');
    })
    .catch(err => {
      this.change_anxiety_loading_boolean;
      console.log(err);
    });
  }

  //formの入力値でstateを変更するメソッド
  on_form_change(e){
    this.setState({[e.target.name]: e.target.value});
  }

  //カテゴリー登録フォームのモーダルの表示するか否かを決めるメソッド
  change_show_boolean() {
    this.setState(state => ({
      show: !state.show
    }));
  }

  //category登録formのボタンが押せるか押せないかの成否を変更するメソッド
  change_loading_boolean() {
    this.setState(state => ({
      loading: !state.loading
    }));
  }

  //anxietyの登録formのボタンを押せるか押せないかの成否を変更するメソッド
  change_anxiety_loading_boolean(){
    this.setState({anxiety_loading: !this.state.anxiety_loading});
  }

  //errorをfalseにするメソッド
  change_error_state_false(){
    this.setState({error: false});
  }

  //form_messageをtrueにしたりfalseにしたりするメソッド。label_nameはどこのformかを表している
  change_form_message_boolean(label_name){
    const form_messages = Object.create(this.state.form_messages);
    form_messages[label_name] = !form_messages[label_name];
    this.setState({form_messages: form_messages});
  }

  //valueを取得してstate.category_idを更新するメソッド
  get_category_id(id){
    this.setState({category_id: id});
  }

  //categoryのformボタンを押すと、実行されるcategory.nameを送信する非同期のpostリクエスト
  category_form_send(name){
    var params = new URLSearchParams()
    params.append('name',name)

    axios.post('/api/v1/categories/', params)
    .then(response => {
      //requestが成功した場合stateを更新したりしますよー
      if (response.data.status == 'SUCCESS'){
        //送れたら、responseからstate.categoriesを更新する+error_messagesを削除する
        const categories = Object.assign([], this.state.categories);
        categories.push([response.data.data.id , response.data.data.name]);
        this.setState({categories: categories, error_messages: "", error: false});
      }
      else if (response.data.status == 'ERROR'){
        const error_messages = "カテゴリー名" + response.data.data.name;
        this.setState({error_messages: error_messages, error: true});
        console.log(error_messages);
      }
      //送れたら、ボタンが再度押されるようにメソッド実行
      this.change_loading_boolean;
    })
    .catch(err => {
      //送れなかった時のlog。ここにerror表示する処理も描きたいね。ここは202的なものじゃないとerrorとして認識しないのでは？
      console.log(err);
    });
  }

  //anxietyの登録ボタンを押したら実行するメソッド（axios.postでanxietyの登録をするメソッド、ボタンが２度押されないようにするためのメソッド）
  anxiety_form_operation(){
    this.anxiety_form_send();
    this.change_anxiety_loading_boolean();
  }

  render(){
    const error = this.state.error;

    return (
      <ErrorBoundary>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>

              {/* 不安modelのform部分。ここもあとで、Componentに置き換える */}
              <Form acceptCharset="UTF-8">

                {/* エラー表示部分 */}
                <ErrorMessages
                  error={this.state.error}
                  error_messages={this.state.error_messages}
                  change_error_state_false={this.change_error_state_false}
                />

                {/* カテゴリー一覧のラジオボタン */}
                <CategoryAll categories={this.state.categories} category_id={this.state.category_id} get_category_id={this.get_category_id}/>

                {/* カテゴリー登録フォームのモーダルを表示するためのボタン */}
                <ButtonForCategory changeboolean={this.change_show_boolean}/>

                {/* 不安とか思考とかそこら辺を入力するform部分。あとで別コンポーネントに書き換える*/}
                <Row>
                  <Col className="formpart">
                    <Card>
                      <Card.Body
                        className="formcard"
                        onMouseOver={()=>this.change_form_message_boolean("anxiety")}
                        onMouseOut={()=>this.change_form_message_boolean("anxiety")}
                      >
                        <Form.Label>不安</Form.Label>
                        <Form.Control size="lg" name="content" value={this.state.content} placeholder="不安" onChange={this.on_form_change}/>
                        <br/>
                        <FormMessage form_message={this.state.form_messages["anxiety"]} form_message_content="今日あなたが感じた不安を入力してください"/>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col className="formpart">
                    <Card>
                      <Card.Body
                        className="formcard"
                        onMouseOver={()=>this.change_form_message_boolean("thinking")}
                        onMouseOut={()=>this.change_form_message_boolean("thinking")}
                      >
                        <Form.Label>思考</Form.Label>
                        <Form.Control size="lg" name="thinking" value={this.state.thinking} placeholder="思考" onChange={this.on_form_change} />
                        <br/>
                        <FormMessage form_message={this.state.form_messages["thinking"]} form_message_content="不安を抱いた時の思考を入力してください"/>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col className="formpart">
                    <Card>
                      <Card.Body
                        className="formcard"
                        onMouseOver={()=>this.change_form_message_boolean("physical")}
                        onMouseOut={()=>this.change_form_message_boolean("physical")}
                      >
                        <Form.Label>体調</Form.Label>
                        <Form.Control size="lg" name="physical" value={this.state.physical} placeholder="体調" onChange={this.on_form_change} />
                        <br/>
                        <FormMessage form_message={this.state.form_messages["physical"]} form_message_content="不安を抱いた時の体調を入力してください"/>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col className="formpart">
                    <Card>
                      <Card.Body
                        className="formcard"
                        onMouseOver={()=>this.change_form_message_boolean("action")}
                        onMouseOut={()=>this.change_form_message_boolean("action")}
                      >
                        <Form.Label>行動</Form.Label>
                        <Form.Control size="lg" name="action" value={this.state.action} placeholder="行動" onChange={this.on_form_change} />
                        <br/>
                        <FormMessage form_message={this.state.form_messages["action"]} form_message_content="不安を抱いた時の行動を入力してください"/>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <div className="submit-button">
                  <Button variant="info" onClick={this.anxiety_form_operation} disabled={this.state.anxiety_loading}>
                    登録する
                  </Button>
                </div>
              </Form>

              {/* カテゴリー登録フォームのモーダル */}
              <CategoryFormPopup
                //popupの表示に関わるshowを送る
                //formの2度押しを封じるloadingを送る
                show={this.state.show}
                loading={this.state.loading}
                // methodを送る
                category_form_send={this.category_form_send}
                change_show_boolean={this.change_show_boolean}
                change_loading_boolean={this.change_loading_boolean}
              />
            </Card.Body>
          </Card>
        </Col>
      </ErrorBoundary>
    );
  }
}

export default withRouter(AnxietiesNewForm)
