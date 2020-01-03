import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './palette.css';
import ColorBox from '../../Components/ColorBox';
import PaletteFooter from '../Footer/PaletteFooter';
import { withStyles } from '@material-ui/styles';

const styles = {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  Colors: {
    height: '90%'
  }
};
class Palette extends Component {
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
    const { classes } = this.props;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        background={color[format]}
        name={color.name}
        showFullPalette={true}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel.bind(this)}
          handleChange={this.changeFormat.bind(this)}
          showSlider={true}
        />
        <div className={classes.Colors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
