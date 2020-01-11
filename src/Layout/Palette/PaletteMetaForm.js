import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = { stage: 'form', newPaletteName: '' };
  }
  handleClickOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  showEmojiPicker() {
    this.setState({ stage: 'emoji' });
  }
  savePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.handleSubmit(newPalette);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }
  render() {
    const { stage, newPaletteName } = this.state;
    const { handleSubmit, hideForm } = this.props;
    return (
      <React.Fragment>
        <Dialog open={stage === 'emoji'} onClose={hideForm}>
          <DialogTitle>Choose Palette Emoji</DialogTitle>
          <Picker onSelect={this.savePalette.bind(this)} />
        </Dialog>
        <Dialog open={stage === 'form'} onClose={hideForm} arial-labelledby='form-dialog-title'>
          <DialogTitle>Choose Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker.bind(this)}>
            <DialogContent>
              <DialogContentText>
                Please enter a name fro your beautiful palette. Make sure it's unique!
              </DialogContentText>

              <TextValidator
                label={'Palette Name'}
                onChange={this.handleChange.bind(this)}
                name='newPaletteName'
                value={newPaletteName}
                fullWidth
                margin='normal'
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Palette Name Already Used']}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color='primary'>
                Cancel
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default PaletteMetaForm;
