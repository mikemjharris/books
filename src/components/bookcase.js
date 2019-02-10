import React from 'react';
import Book from './book';
import styled from 'styled-components';
import {request} from 'graphql-request';
import FilterHelpers from '../filters/filter';

const maxWidth = "640px";

const BookCase_ = styled.div`
  max-width: ${ maxWidth };
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
  overflow-x: hidden;
  height: 3em;
  max-width: calc(${ maxWidth } - 4em);
`
const Stats = styled.div`
  ${ sectionCss }
  background: hsla(120, 50%, 70%, 1);
  th,td {
    padding: 0.2em 0.4em;
    text-align: right;
    min-width: 40px;
  }
  tr:nth-child(odd) {
    background: hsla(120, 50%, 90%, 1);
  }
  tr:nth-child(even) {
    background: hsla(120, 50%, 80%, 1);
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
    background: hsla(120, 50%, 70%, 1);
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
    const query = new URLSearchParams(window.location.search);
    let showFilters = false;

    if (window.location.search != "") {
      showFilters = true;
    }

    this.state = {
      books: [],
      filters: {
       year: query.get('year'),
       gender: query.get('gender')
      },
      years: [],
      gender: gender,
      all: all,
      showFilters: showFilters
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

  setQueryParams = () => {
    const query = new URLSearchParams();
    const filters = this.state.filters;

    for (let filter in filters) {
      query.set(filter, filters[filter] || this.state.all);
     }
    if (history.pushState) {
      const newUrl =  window.location.origin + "?" + query.toString()
      window.history.pushState({path:newUrl},'',newUrl);
    }
  }

  filterYear = (el) => {
    this.setState({filters: { ...this.state.filters, year: parseInt(el.target.value) }}, this.setQueryParams);
  }

  filterGender = (el) => {
    this.setState({filters: { ...this.state.filters, gender: el.target.value }}, this.setQueryParams);
  }

  toggleStats = () => {
    this.setState({showStats: !this.state.showStats});
  }

  toggleSection= () => {
    this.setState({showFilters: !this.state.showFilters});
  }

  render = () => {
    const {books, filters, gender, all, years, stats, showFilters, showStats} = this.state;
    const filteredBooks = filterHelpers.applyAllFiltersToBooks(filters, books);

    return (
      <div>
        <Controls className={ this.state.showFilters && 'show' } >
          <h3 onClick={this.toggleSection}>Filters<span>^</span></h3>
          <div className='grp'>
            <label>By Year</label>
            <select onChange={ this.filterYear }>
              { years.map((year) => {
                    let selected = '';
                    if ( year == filters.year) {
                      selected = true
                    }

                    return(
                      <option value={year} selected={selected}>{year}</option>
                    )
                })
              }
            </select>
          </div>
          <div className='grp'>
            <label>By Gender</label>
            <select onChange={ this.filterGender}>
              { gender.map((gender) => {
                    let selected = '';
                    if ( gender == filters.gender) {
                      selected = true
                    }
                    return(
                      <option value={gender} selected={selected}>{gender}</option>
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
                <th></th>
              {
                  gender.map((g) => {
                    return (<th>{g.toUpperCase()}</th>)
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
          {filteredBooks.length == 0 && filters.gender == 'other' && <div>Hey - you've probably noticed there's an "Other" gender and I haven't read any books fitting in to that category. I might of done - I've gendered people based on their names (bad) or short bio (better) so maybe I have read books by someone not identifying as male or female.  Certianly some of the themes I've read about are more on the gender spectrum - recently thinking of Olivia Laing's "Lonely City"  and "House of Impossible Beauties" by Joseph Conrad. Would love to have some other suggestions particularly from authors who identify as something other than male and female.</div>}
        </BookCase_ >
      </div>
    )
  }
}


