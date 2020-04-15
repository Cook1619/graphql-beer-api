const { ApolloServer, gql } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
//Schema, is the the shape of the data, which is why is works with typescript so well
//Defines all of the types of the data

const typeDefs = gql`
  scalar Date

  enum Status {
    LIKED
    NOT_LIKED
    INDIFFERENT
  }

  type Grains {
    id: ID
    name: String
  }

  type Beer {
    id: ID!
    name: String!
    releaseDate: Date
    color: String!
    abv: Float!
    rating: Int
    grains: [Grains]
    status: Status
    brewery: String!
  }

  type Query {
    beers: [Beer]
    beer(id: ID): Beer
  }
`;

const grains = [
  {
    id: "1234",
    name: "Barley",
  },
  {
    id: '234',
    name: 'Malt2'
  }
];

//This is just dummy data
const beers = [
  {
    id: "123",
    name: "Castle Danger Creame Ale",
    color: "Light Amber",
    abv: "5.5",
    releaseDate: new Date("10-10-2014"),
    rating: 10,
    grains: [
      { id: "1234" },
      { id: "234" },
    ],
    brewery: "Castle Danger",
  },
  {
    id: "456",
    name: "Waconia Brewing Amber Ale",
    releaseDate: new Date("1-10-2016"),
    color: "Amber",
    abv: "6.0",
    rating: 9,
    grains: [
      { id: "234" },
      { id: "1234" },
    ],
    brewery: "Waconia Brewery",
  },
];

const resolvers = {
  Query: {
    beers: () => {
      return beers;
    },
    beer: (obj, { id }, context, info) => {
      const foundBeer = beers.find((beer) => {
        return beer.id === id;
      });
      return foundBeer;
    },
  },
  Beer: {
    grains: (obj, arg, context) => {
      const grainIds = obj.grains.map((grain) => grain.id);
      const filteredGrains = grains.filter((grain) => {
        return grainIds.includes(grain.id);
      });
      return filteredGrains;
    },
  },
  //   (obj, arg, context) => {
  //     console.log("obj", obj)
  //     return { id: "1234", name: 'malt'}
  //   },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Released date is...",
    parseValue(value) {
      //value from client
      return new Date(value);
    },
    serialize(value) {
      //value sent to client
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server
  .listen({
    port: process.env.PORT || 4000,
  })
  .then(({ url }) => {
    console.log(`Server started at ${url}`);
  });
