const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Event = require("./models/event");
const User = require('./models/user');

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("Hello Vinay");
});

app.get("/isallwell", (req, res, next) => {
  res.send("backend is working good");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);
// mongodb+srv://vinaykwin:<password>@eventbookingcluster.r1ciy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://vinaykrjs:9VVQJHyKesdGuvu7@clustereventbookingappd.qk6pz.mongodb.net/EventsDB?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("conected to db");
    app.listen(4616);
    console.log("app is listening on port : 4616");
  })
  .catch((err) => {
    console.log(err);
  });
