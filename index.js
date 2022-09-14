const {ApolloServer, gql} = require('apollo-server');
// this is a practice model
const typeDefs = gql`

    scalar Date
    """
    this is how we document our schema
    """
    type SkiDay{
        "this is how we document our data"
        id:ID!
        name:String!
        date:Date!
        mountains:String!
        conditions: Conditions
    }

    enum Conditions {
        THIN
        POWDER
        HEAVY
        ICE
    }

    type Query {
        totalDays: Int!
        allDays: [SkiDay!]!
    }

    input AddDayInput {
        date: Date!
        mountains: String!
        conditions:Conditions
    }

    type RemoveDayPayload {
        day: SkiDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    """
    this feature is removed in apollo-server to work with subscriptions please look into documentation of subscriptions
    type Subscription {
        newDay: SkiDay!
    }"""

    type Mutation {
        addDay(input: AddDayInput):SkiDay
        removeDay(id: ID!): RemoveDayPayload!
    }
`;

const mocks = {
    Date: () => "1/2/2024",
    String: () => "Cool Data"
};

const server = new ApolloServer({
    typeDefs,
    mocks
})

server.listen().then(({url}) => console.log(`server is running at ${url}`));