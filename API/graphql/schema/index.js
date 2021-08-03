const { buildSchema } = require("graphql");

module.exports = buildSchema(`
        type Event {
          _id: ID!
          name: String!
          startDate: String!
          endDate: String!
          slots: String!
          place: String!
          country: String!
          state: String!
          city: String!
        }
       
        type User {
          _id: ID!
          name: String!
          email: String!
          password: String
        }

        input EventInput {
          name: String!
          startDate: String!
          endDate: String!
          slots: String!
          place: String!
          country: String!
          state: String!
          city: String!
        }

        input UserInput {
          name: String!
          email: String!
          password: String!
        }

        type RootQuery {
            events: [Event!]!
            currentEvent(_id:String!): Event!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
            updateEvent(_id: ID!,name: String!, startDate: String!, endDate: String!, slots: String!, place: String!, country: String!, state: String!, city: String!): Event
            deleteEvent(_id:ID!): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }`);

        
