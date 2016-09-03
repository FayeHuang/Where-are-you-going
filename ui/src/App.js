import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyMarker from './MyMarker';
import PokemonMarker from './PokemonMarker';
import ArrowKey from './ArrowKey';
import MoveToSomewhere from './MoveToSomewhere';
import AppBar from 'material-ui/AppBar';
import CurrentLocationText from './CurrentLocationText';
import AutoMoving from './AutoMoving';
import AutoMovingMarker from './AutoMovingMarker';


export default class App extends Component {
   static propTypes = {
      center: PropTypes.object,
      zoom: PropTypes.number,
      greatPlaceCoords: PropTypes.object,
      pokemonDistance: PropTypes.number,
   };
   
   static defaultProps = {
      center: {lat:24.959225, lng:121.226558},
      zoom: 19,
      pokemonDistance: 0.3, //km
   };
   
   constructor(props) {
      super(props);
      this.state = {
         // 中壢中正公園
         lastLat: 24.959225,
         lastLng: 121.226558,
         nextLat: 24.959225,
         nextLng: 121.226558,
         center: {lat:24.959225, lng:121.226558},
         requestId: 0,
         pokemons: [],
         moveDistance: 0.005, //km
         autoMoving: false,
         autoMovingPoints: [],
         autoMovingIndex: 0,
         autoMovingPause: false,
         autoMovingPlayDisabled: true,
         autoMovingPauseDisabled: true,
         autoMovingLoop: true,
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
      let pointB = pointA.destinationPoint(0, this.state.moveDistance);
      if (pointB.lng() != this.state.nextLng || pointB.lat() != this.state.nextLat) {
         this.setState({nextLat:pointB.lat(), nextLng:pointB.lng()});
         this.changeGps(pointB.lat(), pointB.lng(), this.state.requestId + 1);
      }
   };
   
   handleDownButtonClick = () => {
      // console.log('down button click');
      let pointA = new google.maps.LatLng(this.state.lastLat, this.state.lastLng);
      let pointB = pointA.destinationPoint(180, this.state.moveDistance);
      if (pointB.lng() != this.state.nextLng || pointB.lat() != this.state.nextLat) {
         this.setState({nextLat:pointB.lat(), nextLng:pointB.lng()});
         this.changeGps(pointB.lat(), pointB.lng(), this.state.requestId + 1);
      }
   };
   
   handleRightButtonClick = () => {
      // console.log('right button click');
      let pointA = new google.maps.LatLng(this.state.lastLat, this.state.lastLng);
      let pointB = pointA.destinationPoint(90, this.state.moveDistance);
      if (pointB.lng() != this.state.nextLng || pointB.lat() != this.state.nextLat) {
         this.setState({nextLat:pointB.lat(), nextLng:pointB.lng()});
         this.changeGps(pointB.lat(), pointB.lng(), this.state.requestId + 1);
      }
   };
   
   handleLeftButtonClick = () => {
      // console.log('left button click');
      let pointA = new google.maps.LatLng(this.state.lastLat, this.state.lastLng);
      let pointB = pointA.destinationPoint(270, this.state.moveDistance);
      if (pointB.lng() != this.state.nextLng || pointB.lat() != this.state.nextLat) {
         this.setState({nextLat:pointB.lat(), nextLng:pointB.lng()});
         this.changeGps(pointB.lat(), pointB.lng(), this.state.requestId + 1);
      }
   };
   
   handleMoveToSomewhere = (places) => {
      if (places.length == 0) {
         console.log('can not find target location')
      }
      else {
         this.setState({nextLat:places[0].lat, nextLng:places[0].lng});
         this.changeGps(places[0].lat, places[0].lng, this.state.requestId + 1);
      }
   };
   
   handleMoveDistanceChange = (value) => {
      this.setState({moveDistance:value/1000})
   };
   
   changeGps = (lat, lng, requestId) => {
      console.log("chageGps request id="+requestId);
      this.setState({ requestId: requestId });
      $.ajax({
        url: '/api/gps',
        data: { lat: lat, lng: lng},
        dataType: 'json',
        success: (data) => {
         //  console.log("my request id="+requestId+", current request id="+this.state.requestId);
           if( (requestId == this.state.requestId) && data['success']) {
            //  console.log("move, request id="+requestId);
              //this.setState({ lastLat:lat, lastLng:lng });
              this.updateDeviceGps(lat, lng, requestId);
           }
        },
        error: (xhr, status, err) => {
          console.error('/api/gps', status, err.toString());
        }
      });
   };
   
   updateDeviceGps = (lat, lng, requestId) => {
      console.log("updateDeviceGps request id="+requestId);
      $.ajax({
        url: '/api/gps/device/update',
        dataType: 'json',
        success: (data) => {
          if( (requestId == this.state.requestId) && data['success']) {
            this.setState({ lastLat:lat, lastLng:lng, center:{lat:lat, lng:lng} });
            this.getPokemonLocation();
          }
        },
        error: (xhr, status, err) => {
          console.error('/api/gps/device/update', status, err.toString());
        }
      });
   };
   
   getPokemonLocation = () => {
      let pointA = new google.maps.LatLng(this.state.center.lat, this.state.center.lng);
      let minLatitude = pointA.destinationPoint(180, this.props.pokemonDistance).lat();
      let maxLatitude = pointA.destinationPoint(0, this.props.pokemonDistance).lat();
      let minLongitude = pointA.destinationPoint(270, this.props.pokemonDistance).lng();
      let maxLongitude = pointA.destinationPoint(90, this.props.pokemonDistance).lng();
      
      $.ajax({
        url: '/api/gps/pokemon',
        data: {minLatitude:minLatitude ,maxLatitude:maxLatitude ,minLongitude:minLongitude ,maxLongitude:maxLongitude },
        dataType: 'json',
        success: (data) => {
          if (data['success'] && data['message'])
            this.setState({pokemons:data['message']})
        },
        error: (xhr, status, err) => {
          console.error('/api/gps/pokemon', status, err.toString());
        }
      });
   }
   
   componentDidMount() {
      window.addEventListener('keydown', this.handleKeyPress);
      $.ajax({
        url: '/api/gps/current',
        dataType: 'json',
        success: (data) => {
          let lng = parseFloat(data.lng);
          let lat = parseFloat(data.lat);
          this.setState({ lastLat:lat, lastLng:lng, nextLng:lng, nextLat:lat, center:{lat:lat, lng:lng} });
          //this.getPokemonLocation(lat, lng);
        },
        error: (xhr, status, err) => {
          console.error('/api/gps/current', status, err.toString());
        }
      });
      this.interval = setInterval(this.getPokemonLocation, 3000);
   };
   
   componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyPress);
      clearInterval(this.interval);
   };
   
   handleMapClick = (val) => {
      if (this.state.autoMoving) {
         var points = this.state.autoMovingPoints;
         points.push({lat:val.lat, lng:val.lng});
         this.setState({autoMovingPoints:points});
         if (this.state.autoMovingPause)
            this.setState({autoMovingPlayDisabled:false});
      }
   };
   
   handleAutoMoving = () => {
      if (this.state.autoMoving) {
         this.setState({autoMoving:false, autoMovingPauseDisabled:true, autoMovingPlayDisabled:true, autoMovingPause:true});
      }
      else {
         if (this.state.autoMovingPoints.length > 0)
            this.setState({autoMoving:true, autoMovingPauseDisabled:true, autoMovingPlayDisabled:false, autoMovingPause:true});
         else
            this.setState({autoMoving:true, autoMovingPauseDisabled:true, autoMovingPlayDisabled:true, autoMovingPause:true});
      }
   };
   
   handlePlayButtonClick = () => {
      this.setState({autoMovingPause:false, autoMovingPauseDisabled:false, autoMovingPlayDisabled:true});
      const autoMovingDistance = 4; // meters
      var autoMoving = setInterval( () => {
         if (!this.state.autoMovingPause) {
            let pointA = new google.maps.LatLng(this.state.lastLat, this.state.lastLng);
            let targetPointIndex = this.state.autoMovingIndex;
            let pointB = new google.maps.LatLng(this.state.autoMovingPoints[targetPointIndex].lat, this.state.autoMovingPoints[targetPointIndex].lng);
            let heading = google.maps.geometry.spherical.computeHeading(pointA, pointB);
            let pointA1 = google.maps.geometry.spherical.computeOffset(pointA, autoMovingDistance, heading);
            this.changeGps(pointA1.lat(), pointA1.lng(), this.state.requestId + 1);
            let distanceA1toB = google.maps.geometry.spherical.computeDistanceBetween(pointA1,pointB); //meters
            if ( distanceA1toB < autoMovingDistance ) {
               if (targetPointIndex+1 == this.state.autoMovingPoints.length) {
                  if (this.state.autoMovingLoop)
                     this.setState({autoMovingIndex:0});
                  else {
                     clearInterval(autoMoving);
                     this.setState({autoMovingPause:true, autoMovingPauseDisabled:true, autoMovingPlayDisabled:false, autoMovingIndex:0});
                  }
               }
               else
                  this.setState({autoMovingIndex:targetPointIndex+1})
            }
         }
         else
            clearInterval(autoMoving);
      },1000);
   }
   
   handlePauseButtonClick = () => {
      this.setState({autoMovingPause:true, autoMovingPauseDisabled:true, autoMovingPlayDisabled:false});
   };
   
   handleLoopCheck = (checked) => {
      this.setState({autoMovingLoop:checked});
   };
   
   
   render() {
      const pokemonMarkers = this.state.pokemons.map((marker, index) => {
         return ( <PokemonMarker key={index} lat={marker.lat} lng={marker.lng} image={marker.image} name={marker.name} /> )
      });
      const autoMovingMarkers = this.state.autoMovingPoints.map((marker, index) => {
         return ( <AutoMovingMarker key={index} lat={marker.lat} lng={marker.lng} text={index+1} /> )
      });
      return(
         <MuiThemeProvider>
            <div style={{height:'100%', display:'flex'}}>
               <div style={{flex:'none', width:300, backgroundColor:'#ccc'}}>
                  <AppBar
                     title="Where are you going"
                     showMenuIconButton={false}
                  />
                  
                  <AutoMoving 
                     onAutoMovingToggle={this.handleAutoMoving} 
                     enbleAutoMoving={this.state.autoMoving} 
                     points={this.state.autoMovingPoints} 
                     playButtonDisabled={this.state.autoMovingPlayDisabled}
                     pauseButtonDisabled={this.state.autoMovingPauseDisabled}
                     onPlayButtonClick={this.handlePlayButtonClick}
                     onPauseButtonClick={this.handlePauseButtonClick}
                     targetIndex={this.state.autoMovingIndex}
                     onLoopCheck={this.handleLoopCheck}
                     deaultLoopChecked={this.state.autoMovingLoop}
                  />
                  
                  <MoveToSomewhere onPlacesChanged={this.handleMoveToSomewhere}/>
                  
                  <CurrentLocationText lat={this.state.lastLat} lng={this.state.lastLng} />
                  
                  <ArrowKey 
                     moveDistance={this.state.moveDistance}
                     onMoveDistanceChange={this.handleMoveDistanceChange}
                     onUpButtonClick={this.handleUpButtonClick}
                     onDownButtonClick={this.handleDownButtonClick}
                     onRightButtonClick={this.handleRightButtonClick}
                     onLeftButtonClick={this.handleLeftButtonClick}
                  />
               </div>
               <div style={{flex:1}}>
                  <GoogleMap
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    center={this.state.center}
                    onClick={this.handleMapClick}
                  >
                    {pokemonMarkers}
                    <MyMarker lat={this.state.lastLat} lng={this.state.lastLng} />
                    { this.state.autoMoving ? autoMovingMarkers:false }
                  </GoogleMap>
               </div>
            </div>
            
         </MuiThemeProvider>
      )
   }
}