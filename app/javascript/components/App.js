//全てのコンポーネントをまとめて表示するためのコンポーネント
import React from "react"
import PropTypes from "prop-types"

//reactのrouterを担うプラグイン
import {BrowserRouter, Switch, Route} from 'react-router-dom'

//不安の登録画面のコンポーネントのインポート
import AnxietiesNewForm from './AnxietiesNewForm'
//不安の一覧画面のコンポーネントのインポート
import AnxietiesIndex from './AnxietiesIndex'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const categories = this.props.categories;
    return (
      <>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path={'/'} render={() => <AnxietiesNewForm categories={categories} />} />
              <Route path={'/index'} component={AnxietiesIndex}/>
            </Switch>
          </div>
        </BrowserRouter>
      </>

    );
  }
}

export default App
