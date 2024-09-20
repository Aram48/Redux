import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_BOOKS } from '../components/BookList';

const ADD_BOOK = gql`
    mutation AddBook($title: String!, $price: Float!, $authorName: String!) {
        addBook(title: $title, price: $price, authorName: $authorName) {
            id
            title
            price
            author {
                name
            }
        }
    }
`;

export const AddBook = () => {
    
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [authorName, setAuthorName] = useState('');
    const navigate = useNavigate();

    const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
        onCompleted: () => {
            navigate('/');
        },
        update: (cache, { data: { addBook } }) => {
            const existingData = cache.readQuery({ query: GET_BOOKS });
            const books = existingData ? existingData.books : [];
            cache.writeQuery({
                query: GET_BOOKS,
                data: { books: books.concat([addBook]) }
            });
        },
        refetchQueries: [{ query: GET_BOOKS }]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook({
            variables: {
                title,
                price: parseFloat(price),
                authorName
            }
        });
    };

    return (
        <>
            <h1>Add Book</h1>
            <form onSubmit={handleSubmit}>
                {loading && <p>Loading...</p>}
                {error && <p className="error-message">{error.message}</p>}
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter a title"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Enter a price"
                    required
                />
                <input
                    type="text"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    placeholder="Enter the author's full name"
                    required
                />
                <button type="submit">Save</button>
            </form>
        </>
    );
}