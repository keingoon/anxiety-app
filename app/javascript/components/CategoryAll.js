import React from "react"
import PropTypes from "prop-types"

// bootstrapのインポート
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Col from 'react-bootstrap/Col'

class CategoryAll extends React.Component {
  constructor(props) {
    super(props);
  }

  //ラジオボタンで洗濯したcategory_idで親コンポーネントのstate.category_idを更新する
 get_category_id(id){
   this.props.get_category_id(id)
 }

  render () {
    //親コンポーネントのstate.categories(idとnameの配列)を受け取る
    const categories_id_name = this.props.categories;

    //ラジオボタンを洗濯した時に更新される親コンポーネントのstate.category_idを受け取る
    const category_id = this.props.category_id;

    //categoryのボタン型のラジオボタンを表示
    //ここをanxietiesnewform.jsで表示してもいいかも
    const category_buttons = categories_id_name.map((id_and_name) => {
      return (
        <ToggleButton
          className="category-button"
          variant="outline-success"
          size="lg" value={id_and_name[0]}
          key={id_and_name[0]}
          checked={category_id === id_and_name[0]}
          onChange={()=>this.get_category_id(id_and_name[0])}
        >
          {id_and_name[1]}
        </ToggleButton>
      );
    });

    return (
      <div className="select-category-box">
        <h5>あなたの気分は？</h5>
        <ToggleButtonGroup className="category-button-group" type="radio" name="anxiety[category_id]" defaultValue={null}>
          {category_buttons}
        </ToggleButtonGroup>
      </div>
    );
  }
}

export default CategoryAll
