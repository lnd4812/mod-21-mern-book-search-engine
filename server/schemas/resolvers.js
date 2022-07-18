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
        // books: async (parent, { username }) => {
        //     const params = username ? { username } : {};
        //     return Book.find(params);
        // },
        // book: async (parent, { _id }) => {
        //     return Book.findOne({ _id });
        // }
    },

    Mutation: {
        addUser: async (parent, args) => {
            await console.log('checking validation');
            console.log(args);
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
        saveBook: async(parent,{ bookData }, context) => {
            if (context.user) {
              
                return User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData }},
                    { new: true }
                );
                            } 
            throw new AuthenticationError("Please log in");
        },
        removeBook: async(parent, { bookId }, context) => {
            if (context.user) {
                return User.findByIdAndUpdate(
                    { id: context.user._id},
                    { $pull: { savedBooks: context.bookId }},
                    { new: true }
                );
            }
            throw new AuthenticationError("Please log in.");
        }
    }
};

module.exports = resolvers;