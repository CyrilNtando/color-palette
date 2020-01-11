import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import styles from '../Styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newColorName: '',
      currentColor: 'teal'
    };
  }
  updateCurrentColor = color => {
    this.setState({ currentColor: color.hex });
  };

  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: '' });
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value => {
      return this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
    });
    ValidatorForm.addValidationRule('isColorUnique', value => {
      return this.props.colors.every(({ color }) => color !== this.state.currentColor);
    });
  }
  render() {
    const { isPaletteFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          className={classes.picker}
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
          <TextValidator
            value={newColorName}
            className={classes.colorNameInput}
            variant='filled'
            margin='normal'
            placeholder='Color Name'
            name='newColorName'
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'this field is required',
              'color name must be unique',
              'color must be unique'
            ]}
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.addColorBtn}
            style={{ backgroundColor: isPaletteFull ? 'grey' : currentColor }}
            type='submit'
            disabled={isPaletteFull}
          >
            {isPaletteFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
