import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from '../Navbar/PaletteFormNav';
import ColorPickerForm from '../../Components/ColorPickerForm';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from '../../Components/DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import styles from '../../Styles/NewPaletteFormStyles';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,

      colors: this.props.palettes[0].colors
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = newColor => {
    this.setState(prevState => {
      return { colors: [...prevState.colors, newColor] };
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors;
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  };

  removeColor = colorName => {
    this.setState(prevState => {
      return { colors: prevState.colors.filter(color => color.name !== colorName) };
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };
  clearColor = () => {
    this.setState({ colors: [] });
  };
  addRandomColor = () => {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState(prevState => {
      return { colors: [...prevState.colors, randomColor] };
    });
  };
  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const isPaletteFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant='h4' gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant='contained'
                color='secondary'
                onClick={this.clearColor.bind(this)}
              >
                Clear Palette
              </Button>
              <Button
                variant='contained'
                className={classes.button}
                color={isPaletteFull ? 'grey' : 'primary'}
                onClick={this.addRandomColor.bind(this)}
                disabled={isPaletteFull}
              >
                Random color
              </Button>
            </div>
            <ColorPickerForm
              isPaletteFull={isPaletteFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader}></div>
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor.bind(this)}
            axis='xy'
            onSortEnd={this.onSortEnd.bind(this)}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
