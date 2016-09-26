import visualize from '../../src/index'; // should be included before React
import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

render(<App uuid={Math.random()} />, document.getElementById('app'));

// should be called after render
visualize({
  selector: '#viz',
  width: 1000,
  height: 800,
  displayLabels: false,
  treeConfig: {
    width: 1000,
    height: 600
  }
});
