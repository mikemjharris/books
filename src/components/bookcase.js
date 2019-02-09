import React from 'react';
import Book from './book';
import styled from 'styled-components';
import {request} from 'graphql-request';
import FilterHelpers from '../filters/filter';

const BookCase_ = styled.div`
  max-width: 640px;
 `

const Controls = styled.div`
  max-width: calc(640px - 4em);
  background: hsla(0, 10%, 90%, 1);
  padding: 2em;
  label, span {
    padding: 0.5em 1em 0.5em 0em;
  }
  select {
    margin: 0.5em;
    padding: 0.25em;
    min-width: 75px;
  }
  .grp {
    max-width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .stats {
    min-width: 75px;
    text-align: center;
    background: hsla(0, 10%, 50%, 1);
    font-weight: bold;
    margin: 0.5em;
    padding: 0.25em;
  }
 `

const filterHelpers = new FilterHelpers();

export default class BookCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      filters: {}
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
    this.setState({filters: { ...this.state.filters, year: parseInt(el.target.value) }});
  }

  filterGender = (el) => {
    this.setState({filters: { ...this.state.filters, gender: el.target.value }});
  }

  render = () => {
    const all = 'All';
    const books = this.state.books;
    const filteredBooks = filterHelpers.applyAllFiltersToBooks(this.state.filters, books);
    const years = books.reduce((res, book) => {
      if (res.indexOf(book.year) ==  -1 ) {
        res.push(book.year);
      }
      return res;
    }, [all]);

    const gender = [all, 'f', 'm', 'other'];

    return (
      <div>
        <Controls>
          <h3>Filter books read</h3>
          <div className='grp'>
            <label>By Year</label>
            <select onChange={ this.filterYear }>
              { years.map((year) => {
                    return(
                      <option value={year}>{year}</option>
                  )
                })
              }
            </select>
          </div>
          <div className='grp'>
            <label>By Gender</label>
            <select onChange={ this.filterGender}>
              { gender.map((gender) => {
                    return(
                      <option value={gender}>{gender}</option>
                    )
                })
              }
            </select>
          </div>
          <div className='grp'>
            <span>No books for filter:</span>
            <span className="stats">{filteredBooks.length}</span>
          </div>
        </Controls>
        <BookCase_ >
          {filteredBooks.map((book,i) => <Book book={book} key={book.title} col={i} />)}
        </BookCase_ >
      </div>
    )
  }
}


