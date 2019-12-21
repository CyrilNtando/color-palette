import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './palette.css';
import ColorBox from '../../Components/ColorBox';

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
  }
  changeLevel(level) {
    this.setState((state, props) => {
      return { level };
    });
  }
  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className='palette'>
        <Navbar level={level} changeLevel={this.changeLevel.bind(this)} />
        <div className='palette-colors'>{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}
