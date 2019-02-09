import React from 'react';
import Book from './book';
import styled from 'styled-components';
import {request} from 'graphql-request';
import FilterHelpers from '../filters/filter';

const BookCase_ = styled.div`
  max-width: 640px;
 `
const sectionCss = `
  &.show {
    height: auto;
  }
  h3 {
    margin: 0px -2em;
    padding: 1em 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span {
      padding: 0;
      transform: translateY(-10px) rotate(180deg);
    }
    cursor: pointer;
  }
  &.show h3 span {
    transform: rotate(0deg);
  }
  padding: 0 2em 1em 2em;
  overflow: hidden;
  height: 3em;
  max-width: calc(640px - 4em);
`
const Stats = styled.div`
  ${ sectionCss }
  background: hsla(120, 50%, 70%, 1);
  th,td {
    padding: 0.2em 0.4em;
    text-align: right;
  }
  td:first-child, th:first-child {
    text-align: left;
  }
`
const Controls = styled.div`
  ${ sectionCss }
  background: hsla(0, 10%, 90%, 1);
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
      const years = this.setNosYearsDropdown(data.books);
      const stats = this.createStats(data.books, years, this.state.gender);
      this.setState({
        books: data.books,
        stats: stats,
        years: years
      });
    })
  }

  createStats = (books, years, genders) => {
    let stats = {};

    years.forEach((year) => {
      genders.forEach((gender) => {
        stats[year] = stats[year] || {};
        stats[year][gender] = filterHelpers.applyAllFiltersToBooks({year: year, gender: gender}, books).length;
      })
    });

    return stats;
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

  toggleStats = () => {
    this.setState({showStats: !this.state.showStats});
  }

  toggleSection= () => {
    this.setState({showFilters: !this.state.showFilters});
  }

  render = () => {
    const {books, gender, all, years, stats, showFilters, showStats} = this.state;
    const filteredBooks = filterHelpers.applyAllFiltersToBooks(this.state.filters, books);

    return (
      <div>
        <Controls className={ this.state.showFilters && 'show' } >
          <h3 onClick={this.toggleSection}>Filters<span>^</span></h3>
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
        <Stats className={ this.state.showStats && 'show' } onClick={this.toggleStats}>
          <h3>Stats<span>^</span></h3>
          <p>Number of books read by year and gender</p>
          <table>
           <tbody>
            {
              <tr>
                <th>Year\Gender</th>
              {
                  gender.map((g) => {
                    return (<th>{g}</th>)
                  })
              }
              </tr>
            }
          { stats &&
            years.map((year) => {
              return (
                 <tr>
                  <td>{ year }</td>
                  {
                    gender.map((g) => {
                      return (<td>{stats[year][g]}</td>)
                    })
                 }</tr>
              )
            })
          }
          </tbody>
        </table>

        </Stats>
          <h3>List of Books</h3>
        <BookCase_ >
          {filteredBooks.map((book,i) => <Book book={book} key={book.title} col={i} />)}
        </BookCase_ >
      </div>
    )
  }
}


