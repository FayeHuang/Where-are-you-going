import React, {PropTypes, Component} from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';


export default class ArrowKey extends Component {
  static propTypes = {
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
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

  render() {
    const styles = {
        largeIcon: {
            width: 48,
            height: 48,
        },
        large: {
            width: 96,
            height: 96,
            padding: 24,
            backgroundColor: '#c7bec7',
            border: '1px white solid',
            opacity:0.95
        }
    }
    return (
        <div style={{position:'absolute', bottom:10, right:40, zIndex:999}}> 
            <center>
                <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}
                    onClick={this.onUpButtonClick}
                >
                    <ArrowUpward />
                </IconButton>
            </center>
            <div>
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
            </div>
        </div>
    );
  }
}