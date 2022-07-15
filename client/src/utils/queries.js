import { gql } from '@apollo/client';

export const GET_ME = gql`
    query books($username: String) {
        books(username: $username) {
            _id
            bookId
            authors
            description
            title
            image
            link
        }
    }
`;