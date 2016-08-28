import React, {PropTypes, Component} from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';


export default class ArrowKey extends Component {
  static propTypes = {
    moveDistance: PropTypes.number, // km
    onMoveDistanceChange: PropTypes.func,
    onUpButtonClick: PropTypes.func,
    onDownButtonClick: PropTypes.func,
    onRightButtonClick: PropTypes.func,
    onLeftButtonClick: PropTypes.func,
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      moveDistanceVaild: true
    };
  }
  
  onUpButtonClick = () => {
    if (this.props.onUpButtonClick) {
      this.props.onUpButtonClick();
    }
  };
  
  onDownButtonClick = () => {
    if (this.props.onDownButtonClick) {
      this.props.onDownButtonClick();
    }
  };
  
  onRightButtonClick = () => {
    if (this.props.onRightButtonClick) {
      this.props.onRightButtonClick();
    }
  };
  
  onLeftButtonClick = () => {
    if (this.props.onLeftButtonClick) {
      this.props.onLeftButtonClick();
    }
  };
  
  onMoveDistanceChange = (event) => {
    if (parseFloat(event.target.value)) {
      this.setState({moveDistanceVaild:true});
      if (this.props.onMoveDistanceChange)
        this.props.onMoveDistanceChange(parseFloat(event.target.value));
    }
    else {
      this.setState({moveDistanceVaild:false});
    }
  };

  render() {
    const styles = {
        largeIcon: {
            width: 42,
            height: 42,
        },
        large: {
            width: 84,
            height: 84,
            padding: 21,
            backgroundColor: 'white',
            border: '2px solid #888888',
            opacity:0.95,
            margin: 0.5
        }
    }
    return (
      //style={{position:'absolute', bottom:10, right:0, zIndex:999}}
        <div style={{position:'absolute', bottom:10, width:300, left:0, right:0}}>
            <div style={{padding:'20px 0 0 10px'}}>
              <Subheader>Walk</Subheader>
            </div>
            <TextField
              floatingLabelText="move distance (meters)"
              floatingLabelFixed={true}
              errorText={ this.state.moveDistanceVaild ? "" : "invaild value" }
              style={{paddingLeft:20, width:200}}
              onChange={this.onMoveDistanceChange}
              underlineStyle={{borderColor:'white'}}
              defaultValue={this.props.moveDistance*1000} // km to meters
              floatingLabelStyle={{fontSize:18}}
            />
            <center>
                <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}
                    onClick={this.onUpButtonClick}
                >
                    <ArrowUpward />
                </IconButton>
            </center>
            <center>
                <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}
                    onClick={this.onLeftButtonClick}
                >
                    <ArrowBack />
                </IconButton>
                
                <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}
                    onClick={this.onDownButtonClick}
                >
                    <ArrowDownward />
                </IconButton>
                
                <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}
                    onClick={this.onRightButtonClick}
                >
                    <ArrowForward />
                </IconButton>
            </center>
        </div>
    );
  }
}