import React from 'react';
import styled from 'styled-components';

const BookElement = styled.div`
  border: 1px solid black;
  background: hsla(${props => props.col}, 60%, 60%,1);;
 `

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      book: this.props.book,
      col: this.props.col
    }
  }


  render = () => {
    const book = this.state.book;
    const col = this.state.col ;

    return (
      <BookElement col={ col * 13 } >
        <span>{book.month} / {book.year}</span>
        <p>{book.title } : {book.author}</p>
      </BookElement>
    )
  }
}

