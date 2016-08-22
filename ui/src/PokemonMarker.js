import React, {PropTypes, Component} from 'react';

// import ActionPets from 'material-ui/svg-icons/action/pets';


export default class PokemonMakers extends Component {
  
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <div><img src={this.props.image} style={{width:60, height:60}} /></div>
    );
  }
}