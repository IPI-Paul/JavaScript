const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const { connectDb } = require('./config/db');
const { Client } = require('./models/Client');
const { Project } = require('./models/Project');
const port = process.env.PORT || 5000;

const app = express();

const db = connectDb();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port, console.log(`Server running on port ${port}`));