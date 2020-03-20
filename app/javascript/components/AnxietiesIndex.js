//不安の一覧を表示するためのコンポーネント
import React from "react"
import PropTypes from "prop-types"
//非同期処理をするためのプラグイン
import axios from 'axios'

//子コンポーネントのインポート
import ErrorBoundary from './ErrorBoundary'

//react-bootstrapのインポート
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

class AnxietiesIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anxieties_each_day: {}
    }
    this.getAnxietiesIndex = this.getAnxietiesIndex.bind(this)
    this.anxieties_each_render = this.anxieties_each_render.bind(this)
  }

  getAnxietiesIndex(){
    axios.get('/api/v1/anxieties/')
    .then(response => {
      // handle success
      //ここを連想配列にしてstateに保存する処理を書く
      this.setState({anxieties_each_day: response.data.anxieties_each_day});
      console.log(this.state.anxieties_each_day);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
  }

  //不安一覧を受け取ってリストとして表示するメソッド
  anxieties_each_render(anxieties){
    //ListGroupで不安をリスト表示するまとめ
    const anxietes_each = anxieties.map((anxiety) => {
      return (
        <ListGroup variant="flush" key={anxiety.id}>
          <ListGroup.Item key={anxiety.id}>{anxiety.content}</ListGroup.Item>
          <small className="text-muted">{anxiety.time_of_created_at}</small>
          <br/>
        </ListGroup>
      )
    });
    //不安のリスト表示するreturn
    return anxietes_each;
  }

  //componentが表示される前にgetリクエストで一覧取得するメソッド
  componentDidMount() {
    this.getAnxietiesIndex()
  }

  render () {
    const anxieties_each_day = this.state.anxieties_each_day;
    const anxieties_each_day_show = Object.keys(anxieties_each_day).map((day) => {
      return (
        <Card>
          <Card.Header>{day}</Card.Header>
          {this.anxieties_each_render(anxieties_each_day[day])}
        </Card>
      )
    });

    return (
      <>
        <ErrorBoundary>
          {anxieties_each_day_show}
        </ErrorBoundary>
      </>
    );
  }
}

export default AnxietiesIndex
