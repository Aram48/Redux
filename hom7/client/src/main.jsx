import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createBrowserRouter } from 'react-router-dom';
import { AddBook } from './components/AddBook.jsx';
import { RouterProvider } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4005/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/add',
    element: <AddBook />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </ApolloProvider>
  </StrictMode>,
)
