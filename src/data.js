import Papa from 'papaparse';

// The list lives in a Google Sheet published as CSV; Google allows browsers to
// fetch it directly, so edits to the sheet show up without a deploy.
export const BOOKS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSnuIE5i7X7VhTsbCcyQtLJeBkFpBiF1CMvRtv9Ze8NOMdnFXQZC1JHE40qGo83rkhsAw6CQVhZvqRW/pub?gid=50513809&single=true&output=csv';

// Columns: gender, year, title, author, month. Newest first, as the old
// server returned them.
export async function fetchBooks() {
  const response = await fetch(BOOKS_CSV_URL);
  if (!response.ok) {
    throw new Error(`Couldn't load the books (HTTP ${response.status})`);
  }
  const { data } = Papa.parse(await response.text(), {
    header: true,
    skipEmptyLines: true,
    transform: (value) => value.trim(),
  });
  return data.reverse();
}
