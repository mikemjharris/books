class FilterHelpers {

  applyAllFiltersToBooks = (filters, books) => {
    let filteredBooks = books;

    const yearFilter = filters.year;
    if (yearFilter) {
      filteredBooks = this.filterByYear(filteredBooks, yearFilter);
    }

    const genderFilter = filters.gender;
    if (genderFilter) {
      filteredBooks = this.filterByYear(filteredBooks, genderFilter);
    }

    return filteredBooks;
  }

  filterByYear(books, year) {
    return books.filter((book) => book.year == year);
  }
}

export default FilterHelpers;
