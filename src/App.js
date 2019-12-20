import React, { Component } from 'react';
import Palette from './Layout/Palette/Palette';
import seedPalette from './seedColors';
export default class App extends Component {
  render() {
    return (
      <div>
        <Palette {...seedPalette[4]} />
      </div>
    );
  }
}
