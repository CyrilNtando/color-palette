import React, { Component } from 'react';
import './colorbox.css';
export default class ColorBox extends Component {
  render() {
    return (
      <div className='colorBox' style={{ background: this.props.backgound }}>
        <span>{this.props.name}</span>
        <span>More</span>
      </div>
    );
  }
}
