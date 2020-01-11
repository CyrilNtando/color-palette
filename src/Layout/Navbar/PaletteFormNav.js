import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaletteMetaForm from '../Palette/PaletteMetaForm';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import styles from '../../Styles/PaletteFormNav';
class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formShowing: false
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  showForm() {
    this.setState({ formShowing: true });
  }
  hideForm() {
    this.setState({ formShowing: false });
  }
  render() {
    const { classes, open, handleSubmit, handleDrawerOpen, palettes } = this.props;
    const { formShowing } = this.state;
    return (
      <div className={classes.root}>
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
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to='/'>
              <Button className={classes.button} variant='contained' color='secondary'>
                Go Back
              </Button>
            </Link>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={this.showForm.bind(this)}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {formShowing && (
          <PaletteMetaForm
            handleSubmit={handleSubmit}
            palettes={palettes}
            hideForm={this.hideForm.bind(this)}
          />
        )}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
