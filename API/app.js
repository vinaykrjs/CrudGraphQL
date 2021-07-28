const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql', 
  graphqlHTTP({
    schema: buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
      }
    input UserInput {
        email: String!
        password: String!
      }
  
    type AuthData {
      userId: ID!
      token: String!
      tokenExpiration: Int!
    }
    type RootQuery {
      login(email: String!, password: String!): AuthData!
  }
    type RootMutation {
        createUser(userInput: UserInput): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
      createUser: async args => {
        try {
          const existingUser = await User.findOne({ email: args.userInput.email });
          if (existingUser) {
            throw new Error('User exists already.');
          }
          const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    
          const user = new User({
            email: args.userInput.email,
            password: hashedPassword
          });
    
          const result = await user.save();
    
          return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
          throw err;
        }
      },
      login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          'somesupersecretkey',
          {
            expiresIn: '1h'
          }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 };
      }
    },
    graphiql: true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ko8nz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then((data) => {
    app.listen(8000);
})
.catch(err => {
    console.log(err);
});
