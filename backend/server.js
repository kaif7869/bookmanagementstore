// backend/server.js
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(bodyParser.json());

let books = [
    { id: '1', title: 'Book A', author: 'Author A', genre: 'Fiction', publishedYear: 2020, status: 'Available' },
    { id: '2', title: 'Book B', author: 'Author B', genre: 'Non-fiction', publishedYear: 2019, status: 'Checked Out' },
];

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Add new book
app.post('/books', (req, res) => {
    const newBook = {...req.body, id: Date.now().toString() }; // unique ID
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update book
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.map(book => book.id === id ? {...book, ...req.body } : book);
    res.json({ message: 'Book updated' });
});

// Delete book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(book => book.id !== id);
    res.json({ message: 'Book deleted' });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});