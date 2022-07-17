const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-_v -password')
                    .populate('books');

                return userData;    
            }

            throw new AuthenticationError("Not logged in");
        },
        users: async () => {
            return User.find()
                .select('-_v, -password')
                .populate("books");
        },
        users: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-_v -password')
                .populate("books");
        },
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ title });
        },
        book: async (parent, { _id }) => {
            return Book.findOne({ _id });
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create({ args });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password } ) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async(parent, args, context) => {
            if (context.user) {
                const book = await Book.create({ ...args, username: context.user.username });
        
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book._id }},
                    { new: true }
                );
                return book;
            } 
            throw new AuthenticationError("Please log in");
        },
        removeBook: async(parent, { bookId }, context) => {
            if (context.user) {
                const book = await Book.delete({ ...args, username: context.user.username });

                return User.findByIdAndUpdate(
                    { id: context.user._id},
                    { $pull: { savedBooks: context.book._id }},
                    { new: true }
                );
            }
            throw new AuthenticationError("Please log in.");
        }
    }
};

module.exports = resolvers;