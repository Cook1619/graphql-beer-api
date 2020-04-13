const { ApolloServer, gql } = require('apollo-server');

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

    }

`
//This is just dummy data
const beers = [
    {
        name: 'Castle Danger Creame Ale',
        color: 'Light Amber',
        abv: '5.5',
        rating: 10,
        grains: [{ id: 1, name: 'Malt'}, { id: 2, name: 'Barley'}]
    },
    {
        name: 'Waconia Brewing Amber Ale',
        color: 'Amber',
        abv: '6.0',
        rating: 9
    }
]

const resolvers = {
    Query: {
        beers: () => {
            return beers;
        }
    }
}

const server =  new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url }) => {
    console.log(`Server is started at ${url}`)
});
