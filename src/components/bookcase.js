import React from 'react';
import Book from './book';
import styled from 'styled-components';
import {request} from 'graphql-request';
import FilterHelpers from '../filters/filter';
const BookCase_ = styled.div`
  background: red
 `

const filterHelpers = new FilterHelpers();

export default class BookCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      filters: {
        year: 2016
      }
    }
  }

  componentDidMount() {
    const query = `{books{
          title
          author
          gender
          year
          month
        }
    }`

    request('/graphql', query).then((data) => {
      this.setState({books: data.books});
    })
  }

  filterYear = (el) => {
    this.setState({filters: { year: parseInt(el.target.value) }});
  }

  render = () => {
    const books = this.state.books;
    const filteredBooks = filterHelpers.applyAllFiltersToBooks(this.state.filters, books);
    const years = books.reduce((res, book) => {
      if (res.indexOf(book.year) ==  -1 ) {
        res.push(book.year);
      }
      return res;
    }, []);
    console.log(this.state, filteredBooks);
    return (
      <div>
        <select onChange={ this.filterYear }>
          { years.map((year) => {
                return(
                  <option value={year}>{year}</option>
                )
            })
          }
        </select>
        <BookCase_ >
          {filteredBooks.map((book,i) => <Book book={book} key={book.title} col={i} />)}
        </BookCase_ >
      </div>
    )
  }
}


