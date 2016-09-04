import React, {PropTypes, Component} from 'react';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Checkbox from 'material-ui/Checkbox';
import {ToolbarSeparator} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';


export default class AutoMoving extends React.Component {
  
  static propTypes = {
  };
  
  constructor(props) {
    super(props);
    this.state = {
      speedVaild: true
    };
  }
  
  onAutoMovingToggle = () => {
    if (this.props.onAutoMovingToggle) {
        this.props.onAutoMovingToggle();
    }
  }
  
  onPlayButtonClick = () => {
    if (this.props.onPlayButtonClick) {
        this.props.onPlayButtonClick();
    } 
  }
  
  onPauseButtonClick = () => {
    if (this.props.onPauseButtonClick) {
        this.props.onPauseButtonClick();
    }
  };
  
  onLoopCheck = (event, isInputChecked) => {
    if (this.props.onLoopCheck) {
        this.props.onLoopCheck(isInputChecked);
    }
  };
  
  onSpeedChange = (event) => {
    if (parseFloat(event.target.value)) {
      this.setState({speedVaild:true});
      if (this.props.onSpeedChange)
        this.props.onSpeedChange(parseFloat(event.target.value));
    }
    else {
      this.setState({speedVaild:false});
    }
  };
  
  
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
                <div style={{paddingLeft:10}}> Speed(m/s) : 
                    <TextField 
                        defaultValue={this.props.speed}
                        onChange={this.onSpeedChange}
                        style={{display:'inline-block', width:50}} 
                        errorText={ this.state.speedVaild ? "" : "invaild value" }
                        inputStyle={{textAlign:'center'}}
                    />
                </div>
                <div style={{paddingLeft:10}}>Click map to add moving points</div>
                
                {pointsList}
                
                <Checkbox
                  label="Loop"
                  style={{paddingLeft:10, width:78, display:'inline-block'}}
                  onCheck={this.onLoopCheck}
                  defaultChecked={this.props.deaultLoopChecked}
                />
                <ToolbarSeparator style={{verticalAlign:'top'}}/>
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