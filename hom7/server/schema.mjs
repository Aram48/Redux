import { buildSchema } from "graphql"
const authors = [
    { id: 1, name: "William Shakespeare" },
    { id: 2, name: "Daniel Defoe" },
    { id: 3, name: "Jean Paul Sartre" },
]

const books = [
    { id: 1, title: "Hamlet", price: 22.5, author: authors[0] },
    { id: 2, title: "Robinson", price: 17.5, author: authors[1] },
    { id: 3, title: "The Wall", price: 42.5, author: authors[2] },
    { id: 4, title: "Being and notingness", price: 42.5, author: authors[2] },
    { id: 5, title: "No Exit", price: 32.5, author: authors[2] },
]

export const schema = buildSchema(`
    type Query{
        books: [Book]
        authors: [Author]
        book(id: Int): Book
    }
    
    type Mutation {
        addBook(title: String!, price: Float!, authorName: String!): Book
        deleteBook(id: Int): Book

    }

    type Book{
        id: Int
        title: String
        price: Float
        author: Author
    }

    type Author{
        id: Int
        name: String
        books: [Book]
    }
`);

let nextBookId = 6;
let nextAuthorId = 4;

export const resolvers = {
    books: () => books,
    authors: () => authors,
    book: ({ id }) => books.find(book => book.id === id),
    addBook: ({ title, price, authorName }) => {
        let author = authors.find(a => a.name === authorName);

        if (!author) {
            author = { id: nextAuthorId++, name: authorName };
            authors.push(author);
        }

        const newBook = { id: nextBookId++, title, price, author };
        books.push(newBook);
        return newBook;
    },
    deleteBook: ({ id }) => {
        const bookIndex = books.findIndex(book => book.id === id);
        const deletedBook = books[bookIndex];
        books.splice(bookIndex, 1);
        return deletedBook;
    }
};