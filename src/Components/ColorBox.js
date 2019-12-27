import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './colorbox.css';
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
    const { name, background, id, paletteId, moreUrl } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState.bind(this)}>
        <div className='colorBox' style={{ background }}>
          <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
          <div className={`copy-msg  ${copied && 'show'}`}>
            <h1>copied!</h1>
            <p>{background}</p>
          </div>
          <div className='copy-container'>
            <div className='box-content'>
              <span>{name}</span>
            </div>
            <button className='copy-button'>Copy</button>
          </div>
          <Link to={moreUrl} onClick={e => e.stopPropagation()}>
            <span className='see-more'>More</span>
          </Link>
        </div>
      </CopyToClipboard>
    );
  }
}
export default ColorBox;
