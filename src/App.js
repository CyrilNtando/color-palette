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
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {
      palettes: savedPalettes || seedColors
    };
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  deletePalette(id) {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    );
  }
  savePalette = newPalette => {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage.bind(this)
    );
  };

  syncLocalStorage() {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }
  render() {
    const { palettes } = this.state;
    return (
      <Switch>
        <Route
          exact
          path='/'
          render={routeProps => (
            <PaletteList
              palettes={palettes}
              {...routeProps}
              deletePalette={this.deletePalette.bind(this)}
            />
          )}
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
