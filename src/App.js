import React, { Component } from 'react';
import Palette from './Layout/Palette/Palette';
import seedPalette from './seedColors';
import { generatePalette } from './utils/colorHelpers';
export default class App extends Component {
  render() {
    return (
      <div>
        <Palette palette={generatePalette(seedPalette[4])} />
      </div>
    );
  }
}
