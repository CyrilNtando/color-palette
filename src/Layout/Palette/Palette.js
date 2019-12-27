import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './palette.css';
import ColorBox from '../../Components/ColorBox';

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: 'hex' };
  }
  changeLevel(level) {
    this.setState((state, props) => {
      return { level };
    });
  }

  changeFormat(value) {
    this.setState({ format: value });
  }
  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        background={color[format]}
        name={color.name}
        showLink
      />
    ));
    return (
      <div className='palette'>
        <Navbar
          level={level}
          changeLevel={this.changeLevel.bind(this)}
          handleChange={this.changeFormat.bind(this)}
        />
        <div className='palette-colors'>{colorBoxes}</div>
        <footer className='palette-footer'>
          {paletteName} <span className='emoji'>{emoji}</span>
        </footer>
      </div>
    );
  }
}
