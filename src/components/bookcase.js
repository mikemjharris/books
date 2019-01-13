import React from 'react';
import Book from './book';
import styled from 'styled-components';
import {request} from 'graphql-request';

const BookCase_ = styled.div`
  background: red
 `

export default class BookCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    console.log('mount');
    const query = `{books{
          title
          author
          gender
          year
          month
        }
    }`

    request('/graphql', query).then(data =>
      this.setState({books: data.books})
    )
  }

  render = () => {
    const books = this.state.books;
    return (
      <BookCase_ >
      {books.map((book,i) => <Book book={book} key={i} col={i} />)}
      </BookCase_ >
    )
  }
}


