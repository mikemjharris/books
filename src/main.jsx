import { createRoot } from 'react-dom/client';
import BookCase from './components/bookcase.jsx';
import { BOOKS_CSV_URL } from './data.js';
import './main.scss';

document.getElementById('data-link').href = BOOKS_CSV_URL;

createRoot(document.getElementById('app')).render(<BookCase />);
