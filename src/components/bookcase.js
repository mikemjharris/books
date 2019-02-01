import React from 'react';
import Book from './book';
import styled from 'styled-components';
import {request} from 'graphql-request';
import FilterHelpers from '../filters/filter';
const BookCase_ = styled.div`
  background: red
 `

const Controls = styled.div`
  background: hsla(0, 10%, 90%, 1);
  padding: 2em;
 `

const filterHelpers = new FilterHelpers();

export default class BookCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      filters: {
        gender: 'm'
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

  filterGender = (el) => {
    this.setState({filters: { gender: el.target.value }});
  }

  render = () => {
    const books = this.state.books;
    const filteredBooks = filterHelpers.applyAllFiltersToBooks(this.state.filters, books);
    const years = books.reduce((res, book) => {
      if (res.indexOf(book.year) ==  -1 ) {
        res.push(book.year);
      }
      return res;
    }, ['All']);
    console.log(this.state);
    return (
      <div>
        <Controls>
          <h3>Filter books read</h3>
          <label>By Year</label>
          <select onChange={ this.filterYear }>
            { years.map((year) => {
                  return(
                    <option value={year}>{year}</option>
                  )
              })
            }
          </select>
          <label>By Gender</label>
          <select onChange={ this.filterGender}>
            { ['all', 'f', 'm', 'other'].map((gender) => {
                  return(
                    <option value={gender}>{gender}</option>
                  )
              })
            }
          </select>
        </Controls>
        <BookCase_ >
          {filteredBooks.map((book,i) => <Book book={book} key={book.title} col={i} />)}
        </BookCase_ >
      </div>
    )
  }
}


