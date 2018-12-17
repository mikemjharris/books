import React from 'react';
import Book from './book';
import styled from 'styled-components';

const BookCase_ = styled.div`
  background: red
 `

export default class BookCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    }
  }

  render = () => {
    return (
      <BookCase_ >
       <Book />
       <Book />
      </BookCase_ >
    )
  }
}


