import ReactDOM from 'react-dom';
import React from 'react';
import BookCase from './bookcase';

export default class AppController {
  constructor() {
    this.mountComponent();
  }

  mountComponent() {
    ReactDOM.render(
      <BookCase />,
      document.getElementById('app')
    );
  }
}

