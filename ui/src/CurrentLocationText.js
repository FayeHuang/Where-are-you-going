import React, {PropTypes, Component} from 'react';
import Subheader from 'material-ui/Subheader';

export default class CurrentLocationText extends Component {
  
  static propTypes = {
      lat: PropTypes.number,
      lng: PropTypes.number
  }
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
        <div style={{padding:'20px 0 0 10px'}}>
            <Subheader>Current location</Subheader>
            <ul style={{margin:0}}>
                <li>longitude : {this.props.lng}</li>
                <li>latitude : {this.props.lat}</li>
            </ul>
        </div>
    )
  }
  
}