import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyLocation from './MyLocation';
import ArrowKey from './ArrowKey';

export default class App extends Component {
   static propTypes = {
      center: PropTypes.object,
      zoom: PropTypes.number,
      greatPlaceCoords: PropTypes.object,
      radius: PropTypes.number
   };
   
   static defaultProps = {
      center: {lat:24.959225, lng:121.226558},
      zoom: 19,
      radius: 0.005 //km
   };
   
   constructor(props) {
      super(props);
      this.state = {
         // 中壢中正公園
         lastLat: 24.959225,
         lastLng: 121.226558,
         center: {lat:24.959225, lng:121.226558},
         requestId: 0,
      }
   }
   
   handleKeyPress = (event) => {
      if (event.keyCode == 38)
         this.handleUpButtonClick();
      else if (event.keyCode == 37)
         this.handleLeftButtonClick()
      else if (event.keyCode == 39)
         this.handleRightButtonClick()
      else if (event.keyCode == 40)
         this.handleDownButtonClick()
   };
   
   handleUpButtonClick = () => {
      // console.log('up button click');
      let pointA = new google.maps.LatLng(this.state.lastLat, this.state.lastLng);
      let pointB = pointA.destinationPoint(0, this.props.radius);
      this.changeGps(pointB.lat(), pointB.lng(), this.state.requestId + 1);
   };
   
   handleDownButtonClick = () => {
      // console.log('down button click');
      let pointA = new google.maps.LatLng(this.state.lastLat, this.state.lastLng);
      let pointB = pointA.destinationPoint(180, this.props.radius);
      this.changeGps(pointB.lat(), pointB.lng(), this.state.requestId + 1);
   };
   
   handleRightButtonClick = () => {
      // console.log('right button click');
      let pointA = new google.maps.LatLng(this.state.lastLat, this.state.lastLng);
      let pointB = pointA.destinationPoint(90, this.props.radius);
      this.changeGps(pointB.lat(), pointB.lng(), this.state.requestId + 1);
   };
   
   handleLeftButtonClick = () => {
      // console.log('left button click');
      let pointA = new google.maps.LatLng(this.state.lastLat, this.state.lastLng);
      let pointB = pointA.destinationPoint(270, this.props.radius);
      this.changeGps(pointB.lat(), pointB.lng(), this.state.requestId + 1);
   };
   
   changeGps = (lat, lng, requestId) => {
      this.setState({ requestId: requestId });
      $.ajax({
        url: '/api/gps',
        data: { lat: lat, lng: lng},
        dataType: 'json',
        success: (data) => {
         //  console.log("my request id="+requestId+", current request id="+this.state.requestId);
           if( (requestId >= this.state.requestId) && data['success']) {
            //  console.log("move, request id="+requestId);
              this.setState({ lastLat:lat, lastLng:lng });
           }
        },
        error: (xhr, status, err) => {
          console.error(this.props.apiRecommend, status, err.toString());
        }
      });
   };
   
   componentDidMount() {
      window.addEventListener('keydown', this.handleKeyPress);
      $.ajax({
        url: '/api/gps/default',
        dataType: 'json',
        success: (data) => {
          let lng = parseFloat(data.lng);
          let lat = parseFloat(data.lat);
          this.setState({ lastLat:lat, lastLng:lng, center:{lat:lat, lng:lng} });
        },
        error: (xhr, status, err) => {
          console.error(this.props.apiRecommend, status, err.toString());
        }
      });
   };
   
   componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyPress);
   };
   
   
   render() {
      return(
         <MuiThemeProvider>
            <div style={{height:'100%'}}>
               <GoogleMap
                 defaultCenter={this.props.center}
                 defaultZoom={this.props.zoom}
                 center={this.state.center}
               >
                 <MyLocation lat={this.state.lastLat} lng={this.state.lastLng} />
               </GoogleMap>
               
               <ArrowKey 
                  onUpButtonClick={this.handleUpButtonClick}
                  onDownButtonClick={this.handleDownButtonClick}
                  onRightButtonClick={this.handleRightButtonClick}
                  onLeftButtonClick={this.handleLeftButtonClick}
               />
            </div>
         </MuiThemeProvider>
      )
   }
}