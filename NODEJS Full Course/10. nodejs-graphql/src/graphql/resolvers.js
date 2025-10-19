/* 
Resolvers are a cruical part of GraphQL that determines how data is fetched and
returned in response to a query. They act as the bridge between the client's request and the data source, whether it's a database, API or any other data store. 

Resolvers are responsible for fetching the data for each field in a query and
transfroming it into that format expected by the client.

GraphQL resolvers are defined inside a GraphQL Schema and are responsible for
resolving the fields that are represented in a given query. Resolvers have to 
fetch the data and transfrom it into the required format before ending it to the
client. 
*/
const products = require("../data/products");

const resolvers = {
    Query: {
        products : () => products,
        product: (_, {id}) => products.find((item) => item.id === id),
    },
}

module.exports = resolvers;