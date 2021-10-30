const { gql } = require('apollo-server-express');

const typeDefs = gql` {
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Item {
    _id: ID!
    price: Float
    count: Int
    name: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    items: [Item]
    item(id: ID!): Item
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    addItem(_id:String!, price:Float!, count:Int!, name:String!): 
  }
  
}`;

module.exports = typeDefs;
