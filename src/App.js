import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Layout/Palette/Palette';
import PaletteList from './Layout/Palette/PaletteList';
import SingleColorPalette from './Layout/Palette/SingleColorPalette';
import NewPaletteForm from './Layout/Palette/NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './utils/colorHelpers';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.findPalette = this.findPalette.bind(this);
    this.state = {
      palettes: seedColors
    };
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }

  savePalette = newPalette => {
    console.log(newPalette);
    this.setState(prevState => {
      return { palettes: [...prevState.palettes, newPalette] };
    });
  };
  render() {
    const { palettes } = this.state;
    return (
      <Switch>
        <Route
          exact
          path='/'
          render={routeProps => <PaletteList palettes={palettes} {...routeProps} />}
        />
        <Route
          exact
          path={'/palette/new'}
          render={routeProps => (
            <NewPaletteForm
              savePalette={this.savePalette.bind(this)}
              palettes={palettes}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
          )}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={routeProps => (
            <SingleColorPalette
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
              colorId={routeProps.match.params.colorId}
            />
          )}
        />
      </Switch>
    );
  }
}
