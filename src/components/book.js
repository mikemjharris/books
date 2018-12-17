import React from 'react';
import styled from 'styled-components';

const BookElement = styled.div`
  border: 1px solid black
 `

const Book = (props) => {
  const title = props.book.title;
  const author = props.book.author;
  const year = props.book.year;
  const month = props.book.month;

  return (
    <BookElement>
      <span>{month} / {year}</span>
      <p>{ title } : { author}</p>
    </BookElement>
  )
}

export default Book;

