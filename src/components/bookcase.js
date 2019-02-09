import React from 'react';
import Book from './book';
import styled from 'styled-components';
import {request} from 'graphql-request';
import FilterHelpers from '../filters/filter';

const BookCase_ = styled.div`
  max-width: 640px;
 `

const Stats = styled.div`
  background: red;
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

    const all = 'All';
    const gender = [all, 'f', 'm', 'other'];

    this.state = {
      books: [],
      filters: {},
      years: [],
      gender: gender,
      all: all
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
      const stats = this.createStats(data.books);
      const years = this.setNosYearsDropdown(data.books);
      this.setState({
        books: data.books,
        stats: stats,
        years: years
      });
    })
  }

  createStats = (books) => {

    console.log(books);
    return books;
  }

  setNosYearsDropdown = (books) => {
    return books.reduce((res, book) => {
      if (res.indexOf(book.year) ==  -1 ) {
        res.push(book.year);
      }
      return res;
    }, [this.state.all]);
  }

  filterYear = (el) => {
    this.setState({filters: { ...this.state.filters, year: parseInt(el.target.value) }});
  }

  filterGender = (el) => {
    this.setState({filters: { ...this.state.filters, gender: el.target.value }});
  }

  render = () => {
    const {books, gender, all, years} = this.state;

    const filteredBooks = filterHelpers.applyAllFiltersToBooks(this.state.filters, books);

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
        <Stats>
          <p>Stats</p>
        </Stats>
        <BookCase_ >
          {filteredBooks.map((book,i) => <Book book={book} key={book.title} col={i} />)}
        </BookCase_ >
      </div>
    )
  }
}


