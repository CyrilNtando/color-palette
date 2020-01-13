import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Blue from '@material-ui/core/colors/blue';
import Red from '@material-ui/core/colors/red';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from '../../Styles/PaletteListStyles';
class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: ''
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  openDialog(id) {
    this.setState({ openDeleteDialog: true, deletingId: id });
  }
  closeDialog() {
    this.setState({ openDeleteDialog: false, deletingId: '' });
  }
  gotToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  handleDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }
  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>Color Palette</h1>
            <Link to={'/palette/new'}>Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <MiniPalette
                  key={palette.id}
                  id={palette.id}
                  {...palette}
                  handleClick={() => this.gotToPalette(palette.id)}
                  openDialog={this.openDialog}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          arial-labelledby='delete-dialog-title'
          onClose={this.closeDialog}
        >
          <DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <Avatar style={{ backgroundColor: Blue[100], color: Blue[600] }}>
                <CheckIcon />
              </Avatar>
              <ListItemText className='u-margin-left' primary='Delete' />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <Avatar style={{ backgroundColor: Red[100], color: Red[600] }}>
                <CloseIcon />
              </Avatar>
              <ListItemText className='u-margin-left' primary='Cancel' />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
