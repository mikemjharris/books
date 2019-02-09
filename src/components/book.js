import React from 'react';
import styled from 'styled-components';

const BookElement = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5em 1em;
  justify-content: space-between;
  border: 1px solid black;
  background: hsla(${props => props.col}, 60%, 60%,1);;
 `

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book,
      col: this.props.col
    }
  }


  render = () => {
    const book = this.state.book;
    const col = this.state.col;

    return (
      <BookElement col={ col * 13 } >
        <div>{book.title } : {book.author} ({book.gender})</div>
        <div>{book.year}</div>
      </BookElement>
    )
  }
}

