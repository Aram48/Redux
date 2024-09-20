import { Link } from "react-router-dom";
import { gql, useQuery, useMutation } from '@apollo/client';

export const GET_BOOKS = gql`
  {
    books{
      id
      title
      price
      author{
        name
      }
    }
  } 
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [deleteBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }]
    });

    const handleDelete = (id) => {
        deleteBook({ variables: { id } });
    };

    return (
        <div className="container">
            <h1>Books</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error.message}</p>}
            <div className="book-list">
                {data && data.books.map(book => (
                    <div className="book-item" key={book.id}>
                        <p>{book.title} <small>{book.price}$</small></p>
                        <strong>by {book.author.name}</strong>
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <Link className="add-book-link" to='/add'>Add book</Link>
        </div>
    );
}