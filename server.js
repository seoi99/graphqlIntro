const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(gender: String): [Person]
  }

  type Person {
    id: Int
    name: String
    age: Int
    gender: String
  }

  type Mutation {
    updateUser(id: Int!, name: String!, age: String): Person
  }
`);

const users = [ // Dummy data
  {
    id: 1,
    name: 'Brian',
    age: '21',
    gender: 'M',
  },
  {
    id: 2,
    name: 'Kim',
    age: '22',
    gender: 'M',
  },
  {
    id: 3,
    name: 'Joseph',
    age: '23',
    gender: 'M',
  },
  {
    id: 3,
    name: 'Faith',
    age: '23',
    gender: 'F',
  },
  {
    id: 5,
    name: 'Joy',
    age: '25',
    gender: 'F',
  },
];


const getUser = (body) => {
  const userId = body.id;
  return users.filter((user) => user.id === body.id)[0];
};
const getUsers = (body) => (body.gender ? users.filter((user) => user.gender === body.gender) : users);

const updateUser = (body) => {
  users.map((user) => {
    if (user.id === body.id) {
      user.name = body.name;
      user.age = body.age;
    }
    return user;
  });
  return users.filter((user) => user.id === body.id)[0];
};
const root = {
  hello: () => 'Hello World',
  user: getUser,
  users: getUsers,
  updateUser,
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('first app using graphql localhost:4000/graphql'));
