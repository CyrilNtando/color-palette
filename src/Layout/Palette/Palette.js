import React, { Component } from 'react';
import './palette.css';
import ColorBox from '../../Components/ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
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
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onAfterChange={this.changeLevel.bind(this)}
        />
        {/* navbar here */}
        <div className='palette-colors'>{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}
