import React, {PropTypes, Component} from 'react';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';


export default class AutoMoving extends React.Component {
  
  static propTypes = {
  };
  
  constructor(props) {
    super(props);
    // this.state = {
    //   playButtonDisabled: this.props.defaultPlayButtonDisabled,
    //   pauseButtonDisabled: this.props.defaultPauseButtonDisabled,
    // };
  }
  
  onAutoMovingToggle = () => {
    if (this.props.onAutoMovingToggle) {
        this.props.onAutoMovingToggle();
    }
    
    // if (this.state.playButtonDisabled)
    //     this.setState({playButtonDisabled:false});
    // else
    //     this.setState({playButtonDisabled:true, pauseButtonDisabled:true});
  }
  
  onPlayButtonClick = () => {
    if (this.props.onPlayButtonClick) {
        this.props.onPlayButtonClick();
    } 
    // this.setState({playButtonDisabled:true, pauseButtonDisabled:false});
  }
  
  onPauseButtonClick = () => {
    if (this.props.onPauseButtonClick) {
        this.props.onPauseButtonClick();
    }
    // this.setState({playButtonDisabled:false, pauseButtonDisabled:true});
  }
  
  render() {
    const pointsList = this.props.points.map((marker, index) => {
        return ( 
            <div style={this.props.targetIndex == index ? {paddingLeft:10,color:'#dc7878'} : {paddingLeft:10}} 
                 key={index}
            >
                [{index + 1}] {marker.lat.toFixed(5)},{marker.lng.toFixed(5)}
            </div>
        )
    });
    return(
        <div style={{padding:'20px 0 0 10px'}}>
            <Subheader>Auto Moving  
                <Toggle style={{width:50, display:'inline-block'}} toggled={this.props.enbleAutoMoving} onToggle={this.onAutoMovingToggle} /> 
            </Subheader>
            <div style={this.props.enbleAutoMoving ? {}:{display:'none'}}>
                <div style={{paddingLeft:10}}>Click map to add moving points</div>
                {pointsList}
                <IconButton disabled={this.props.playButtonDisabled} onClick={this.onPlayButtonClick}>
                    <PlayArrow />
                </IconButton>
                <IconButton disabled={this.props.pauseButtonDisabled} onClick={this.onPauseButtonClick}>
                    <Pause />
                </IconButton>
            </div>
        </div>
    ) 
  }
}