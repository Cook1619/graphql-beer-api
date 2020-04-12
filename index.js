const { ApolloServer, gql } = require('apollo-server');

//Schema, is the the shape of the data, which is why is works with typescript so well
//Defines all of the types of the data

const typeDefs = gql`

    type Beer {
        name: String
        color: String
        abv: Float
        rating: Int
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
        rating: 10
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
