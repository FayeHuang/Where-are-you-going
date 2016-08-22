import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import MapsPersonPinCircleFrom from 'material-ui/svg-icons/maps/person-pin-circle';
import MapsDirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import Subheader from 'material-ui/Subheader';


export default class MoveToSomewhere extends React.Component {
  
  static propTypes = {
    placeholder: React.PropTypes.string,
    onPlacesChanged: React.PropTypes.func
  }
  
  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      var places = this.searchBox.getPlaces().map(function(place, i) {
        place.lat = place.geometry.location.lat();
        place.lng = place.geometry.location.lng();
        place.name = place.formatted_address;
        return place;
      });
      this.props.onPlacesChanged(places);
    }
  }
  
  triggerGoogleMapPlaceChanged= () => {
    google.maps.event.trigger(ReactDOM.findDOMNode(this.searchInput).getElementsByTagName('input')[0], 'focus');
    google.maps.event.trigger(ReactDOM.findDOMNode(this.searchInput).getElementsByTagName('input')[0], 'keydown', {
      keyCode: 13
    });
  }
  
  componentDidMount() {
    this.searchBox = new google.maps.places.SearchBox(ReactDOM.findDOMNode(this.searchInput).getElementsByTagName('input')[0]);
    ReactDOM.findDOMNode(this.searchInput).getElementsByTagName('input')[0].placeholder = "";
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  
  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }
  
  render() {
    return(
        <div style={{padding:'20px 0 0 10px'}}>
            <Subheader>Move to somewhere</Subheader>
            
            <MapsPersonPinCircleFrom style={{verticalAlign: 'middle'}} color='white' />
            <TextField
              hintText="go somewhere..."
              ref={(ref) => this.searchInput = ref}
              style={{width:200}}
              underlineStyle={{borderColor:'white'}}
            />
            <IconButton 
                style={{verticalAlign: 'middle'}} 
                tooltip="Go!" 
                tooltipPosition="top-center" 
                onClick={this.triggerGoogleMapPlaceChanged}
            >
                <MapsDirectionsRun color="#ff4081" />
            </IconButton>
        </div>
    ) 
  }
}