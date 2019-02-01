class FilterHelpers {

  applyAllFiltersToBooks = (filters, books) => {
    let filteredBooks = books;

    const yearFilter = filters.year;
    if (yearFilter) {
      filteredBooks = this.filterByYear(filteredBooks, yearFilter);
    }

    const genderFilter = filters.gender;
    if (genderFilter) {
      filteredBooks = this.filterByGender(filteredBooks, genderFilter);
    }

    return filteredBooks;
  }

  filterByYear(books, year) {
    return books.filter((book) => book.year == year);
  }

  filterByGender(books, gender) {
    return books.filter((book) => book.gender == gender);
  }
}

export default FilterHelpers;
