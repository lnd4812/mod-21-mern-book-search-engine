const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type: User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        books: [Book]
        savedBooks: [Book]
    }
    type: Book {
        _id: id
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(username: String): [Book]
        book(_id: ID!): Book
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String! password: String!): Auth
        addBook(bookID: ID!, title: String): Book
        saveBook(username: String):[Book]
    }

    `;

module.exports = typeDefs;