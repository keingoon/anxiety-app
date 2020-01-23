import React from 'react';
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router';

class Home extends React.Component {
  handleToAboutPage = () => {
    this.props.history.push('/about')
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleToAboutPage}>
          aboutページへ遷移する
        </Button>
      </div>
    )
  }
}

export default withRouter(Home)
