import ReactDOM from 'react-dom';
import React from 'react';
import Book from './book';

export default class AppController {
  constructor() {
    console.log('here');
    this.mountComponent();
  }

  mountComponent() {
    ReactDOM.render(
      <Book />,
      document.getElementById('app')
    );
  }
}

