const { ApolloServer, gql } = require("apollo-server");

//Schema, is the the shape of the data, which is why is works with typescript so well
//Defines all of the types of the data

const typeDefs = gql`
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
    color: String!
    abv: Float!
    rating: Int
    grains: [Grains]
    status: Status
  }

  type Query {
    beers: [Beer]
    beer(id: ID): Beer
  }
`;
//This is just dummy data
const beers = [
  {
    id: "123",
    name: "Castle Danger Creame Ale",
    color: "Light Amber",
    abv: "5.5",
    rating: 10,
    grains: [
      { id: 1, name: "Malt" },
      { id: 2, name: "Barley" },
    ],
  },
  {
    id: "456",
    name: "Waconia Brewing Amber Ale",
    color: "Amber",
    abv: "6.0",
    rating: 9,
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
