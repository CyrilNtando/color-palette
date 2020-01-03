import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/styles';
import chroma from 'chroma-js';
import './colorbox.css';

const styles = {
  colorBox: {
    width: '20%',
    height: props => (props.showFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover button': {
      opacity: 1
    }
  },
  copyText: {
    color: props => (chroma(props.background).luminance() >= 0.08 ? 'black' : 'white')
  },
  colorName: {
    color: props => (chroma(props.background).luminance() <= 0.08 ? 'white' : 'black')
  },
  seeMore: {
    color: props => (chroma(props.background).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)' : 'white'),
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.3)',
    width: '60px',
    height: '30px',
    right: 0,
    bottom: 0,
    padding: '10px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    lineHeight: '30px',
    textAlign: 'center'
  },
  copyButton: {
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: ' center',
    outline: 'none',
    background: ' rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: ' none',
    opacity: 0,
    color: props => (chroma(props.background).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)' : 'white')
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  copyOverlay: {
    opacity: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 0.5s ease-in-out',
    transform: 'scale(0.1)'
  },
  showOverlay: {
    opacity: 1,
    transform: 'scale(50)',
    zIndex: 10,
    position: 'absolute'
  },
  copyMessage: {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    transform: 'scale(0.1)',
    opacity: 0,
    color: 'white',
    '& h1': {
      fontWeight: 400,
      textShadow: '1px 2px black',
      background: 'rgba(255, 255, 255, 0.3)',
      width: '100%',
      textAlign: 'center',
      marginBottom: 0,
      padding: '1rem',
      textTransform: 'uppercase'
    },
    '& p': {
      fontSize: '2rem',
      fontWeight: 100
    }
  },
  showCopyMessage: {
    opacity: 1,
    transform: 'scale(1)',
    zIndex: 25,
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.3s'
  }
};
class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
  }
  changeCopyState() {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  }
  render() {
    const { name, background, moreUrl, showFullPalette, classes } = this.props;
    const { copied } = this.state;
    console.log('is Showing' + showFullPalette);
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState.bind(this)}>
        <div className={classes.colorBox} style={{ background }}>
          <div
            style={{ background }}
            className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
          />
          <div className={`${classes.copyMessage} ${copied && classes.showCopyMessage}`}>
            <h1>copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showFullPalette && (
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
export default withStyles(styles)(ColorBox);
