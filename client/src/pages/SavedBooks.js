import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { books } from './SearchBooks';
import { removeBookId } from '../utils/localStorage';


const SavedBooks = () => {
  
  const [userData, setUserData] = useState([]);
  const userDataLength = Object.keys(userData).length;

  const { userData: userParam } = useParams(); 
  const { loading, data } = useQuery(GET_ME, {
      variables: { userData: userParam },
    });

  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (Auth.loggedIn () && Auth.getToken().data.userData === userParam) {
    return <Redirect to="/saved" />;
  }
   if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.userData) {
    return (
      <h4> Please log in to view this information.  Use navigation links at the top of the page to sign up or log in.</h4>
    );
  }
    
  
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  // const deleteBook = useMutation(REMOVE_BOOK);
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const response = deleteBook(bookId, token);

  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }

  //     const updatedUser = await response.json();
  //     setUserData(updatedUser);
  //     // upon success, remove book's id from localStorage
  //     removeBookId(bookId);
  //   } catch (err) {
  //     console.error(err);
  //   }
 

  // // if data isn't here yet, say so
  // if (!userDataLength) {
  //   return <h2>LOADING...</h2>;
  // }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                 
                </Card.Body>
              </Card>
            )}
          )}
          </CardColumns>
      </Container>
    </>
   )};
export default SavedBooks;
