import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';


const SavedBooks = () => {
  const [userData, setUserData] = useState([]);
  const userDataLength = Object.keys(userData).length;

  const { userData: userParam } = useParams(); 
  const { loading, data } = useQuery(GET_ME, {
      variables: { userData: userParam },
      });

    const user = data?.me || data?.user || {};
    setUserData(user);

   
    // create function that accepts the book's mongo _id value as param and deletes the book from the database
   const removeBook  = useMutation(REMOVE_BOOK, {
    update(cache, { data: {removeBook}} ) {
      try {
        const { me } = cache.readQuery({ query: GET_ME });
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...me, bookData: [...me.bookData, removeBook]}},
        });
      }
      catch(e) {
        console.error(e); 
      }
    }, 
  });  

    try {
      if (Auth.loggedIn () && Auth.getToken().data.userData === userParam) {
        return <Redirect to="/saved" />;
      }
    
      if (!user?.userData) {
        throw new Error('Please log in to view this information.  Use navigation links at the top of the page to sign up or log in');      
      }
    }
    catch (err) {
      console.error(err);
    } 
  // if data isn't here yet, say so
    if (!userDataLength || loading ) {
      return <h2>LOADING...</h2>;
    }
  

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
                  <Button className='btn-block btn-danger' onClick={() => removeBookId(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            )}
          )}
          </CardColumns>
      </Container>
    </>
   );
};

export default SavedBooks;
