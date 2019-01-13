class FilterHelpers {

  applyAllFiltersToBooks = (filters, books) => {
    let filteredBooks;

    const yearFilter = filters.year;
    if (yearFilter) {
      filteredBooks = this.filterByYear(books, yearFilter);
    }

    return filteredBooks;
  }

  filterByYear(books, year) {
    return books.filter((book) => book.year == year);
  }
}

export default FilterHelpers;
