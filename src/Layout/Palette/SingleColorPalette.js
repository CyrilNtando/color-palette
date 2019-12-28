import React, { Component } from 'react';
import ColorBox from '../../Components/ColorBox';
import Navbar from '../Navbar/Navbar';
import PaletteFooter from '../Footer/PaletteFooter';
export default class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: 'hex' };
  }
  changeFormat(value) {
    this.setState({ format: value });
  }
  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy));
    }

    return shades.slice(1);
  }
  render() {
    const { format } = this.state;
    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.id} name={color.name} background={color[format]} showLink={false} />
    ));
    const { paletteName, emoji } = this.props.palette;
    return (
      <div className='palette'>
        <Navbar handleChange={this.changeFormat.bind(this)} showSlider={false} />
        <div className='palette-colors'>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}