import React, { Component } from 'react';
import './palette.css';
import ColorBox from '../../Components/ColorBox';
export default class Palette extends Component {
  render() {
    const colorBoxes = this.props.colors.map(color => (
      <ColorBox backgound={color.color} name={color.name} />
    ));
    return (
      <div className='palette'>
        {/* navbar here */}
        <div className='palette-colors'>{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}
