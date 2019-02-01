class FilterHelpers {

  applyAllFiltersToBooks = (filters, books) => {
    let filteredBooks = books;
    const all = 'All';

    const yearFilter = filters.year;
    if (yearFilter && yearFilter !== all) {
      filteredBooks = this.filterByYear(filteredBooks, yearFilter);
    }

    const genderFilter = filters.gender;
    if (genderFilter && genderFilter !== all) {
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
