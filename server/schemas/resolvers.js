const { User } = require('../models');
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
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
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
        saveBook: async(parent,{ user, bookData }, context) => {
            console.log(user);
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData }},
                    { new: true }
                );
                return updatedUser;
            } 
            throw new AuthenticationError("Please log in");
        },
        removeBook: async(parent, bookId, context) => {
            if (context.user) {
               const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $pull: { savedBooks: {bookData: context.bookId }}},
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("Please log in.");
        }
    }
};

module.exports = resolvers;