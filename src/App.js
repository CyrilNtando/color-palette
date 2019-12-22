import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Layout/Palette/Palette';
import seedPalette from './seedColors';
import { generatePalette } from './utils/colorHelpers';
export default class App extends Component {
  findPalette(id) {
    return seedPalette.find(function(palette) {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => <h1>Palette list goes here</h1>} />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
          )}
        />
      </Switch>

      //   <div>
      //     <Palette palette={generatePalette(seedPalette[3])} />
      //   </div>
    );
  }
}
