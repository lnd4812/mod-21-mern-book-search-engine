import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutution login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            tokenvalueuser {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook() {
        saveBook() {

        }
    }
`;

export const REMOVE_BOOK =gql `
    mutation removeBook() {
        removeBook() {

        }
    }
`;