import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, newPaletteName: '' };
    this.handleClose = this.handleClose.bind(this);
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
  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }
  render() {
    const { open, newPaletteName } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div>
        <Dialog open={open} onClose={this.handleClose} arial-labelledby='form-dialog-title'>
          <DialogTitle>Enter Palette Name</DialogTitle>
          <DialogContent>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
              <TextValidator
                label={'Palette Name'}
                onChange={this.handleChange.bind(this)}
                name='newPaletteName'
                value={newPaletteName}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Palette Name Already Used']}
              />
              <Button variant='contained' color='primary' type='submit'>
                Save Palette
              </Button>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
