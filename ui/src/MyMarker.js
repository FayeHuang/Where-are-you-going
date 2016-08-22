import React, {PropTypes, Component} from 'react';
import MapsDirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';


export default class MyMarker extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <div className="hint hint--html hint--top hint--top-place">
        <MapsDirectionsWalk style={{height:68, width:68}}/>
        <div className="hint__content">
         I'm here !
        </div>
       </div>
    );
  }
}