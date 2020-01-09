import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import clsx from 'clsx';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: ''
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes, open, handleSubmit, handleDrawerOpen } = this.props;
    const { newPaletteName } = this.state;
    return (
      <div>
        <CssBaseline />
        <AppBar
          position='fixed'
          color='default'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
              <TextValidator
                label={'Palette Name'}
                onChange={this.handleChange.bind(this)}
                name='newPaletteName'
                value={this.state.newPaletteName}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Palette Name Already Used']}
              />
              <Button variant='contained' color='primary' type='submit'>
                Save Palette
              </Button>
              <Link to='/'>
                <Button variant='contained' color='secondary'>
                  Go Back
                </Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default PaletteFormNav;
