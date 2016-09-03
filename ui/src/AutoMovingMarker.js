import React, {PropTypes, Component} from 'react';
import MapsDirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';


export default class AutoMovingMarker extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
      
    const K_WIDTH = 20;
    const K_HEIGHT = 20;

    const greatPlaceStyle = {
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: K_WIDTH,
      height: K_HEIGHT,
      left: -K_WIDTH / 2,
      top: -K_HEIGHT / 2,
    
      borderRadius: K_HEIGHT,
      backgroundColor: '#dc7878',
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 4
    };
    
    return (
        <div style={greatPlaceStyle}>
            {this.props.text}
        </div>
    );
  }
}