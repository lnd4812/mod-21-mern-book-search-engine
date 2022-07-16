import { gql } from '@apollo/client';

export const GET_ME = gql`
    query books($username: String) {
        me (username: $username) {
            _id
            username
            email 
            bookCount
            savedBooks
        }
    }
`;