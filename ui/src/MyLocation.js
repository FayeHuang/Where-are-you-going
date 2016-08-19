import React, {PropTypes, Component} from 'react';
import MapsDirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';


export default class MyLocation extends Component {
  static propTypes = {
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const myLocationStyle = {
        background: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0OHY0OGgtNDh6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI4IDcuNmMxLjk4IDAgMy42LTEuNjEgMy42LTMuNnMtMS42Mi0zLjYtMy42LTMuNmMtMS45OSAwLTMuNiAxLjYxLTMuNiAzLjZzMS42MSAzLjYgMy42IDMuNnptLjI0IDEyLjRoOS43NnYtMy42aC03LjI1bC00LTYuNjZjLS41OS0xLTEuNjgtMS42Ni0yLjkyLTEuNjYtLjM0IDAtLjY3LjA1LS45OC4xNGwtMTAuODUgMy4zOHYxMC40aDMuNnYtNy4zM2w0LjIxLTEuMzEtNy44MSAzMC42NGgzLjZsNS43NC0xNi4yMiA0LjY2IDYuMjJ2MTBoMy42di0xMi44MWwtNC45OC05LjA4IDEuNDctNS43NCAyLjE1IDMuNjN6Ii8+PC9zdmc+")',
        backgroundSize: '52px 52px',
        backgroundRepeat: 'no-repeat',
        width:52,height:52,
    };
    
    return (
       <div style={myLocationStyle}></div>
    );
  }
}