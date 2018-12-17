import React from 'react';
import styled from 'styled-components';

const BookElement = styled.div`
  border: 1px solid black
 `

const Book = (props) => {
  return (
    <BookElement>
      <p>A book</p>
    </BookElement>
  )
}

export default Book;

