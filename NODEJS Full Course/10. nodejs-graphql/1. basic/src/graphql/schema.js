//This is file will tell what will be the structure of your data

const {gql} = require("graphql-tag");

//String
//Int
//Float
//Boolean
//ID -> an unique identifier

/* 
The graphql type system describes what dtaa can be queried from the API. The 
collection of thoese capabilities is referred to as the services's schema and
clients can use that schema to send queries to teh API that retrun predictable
results.
*/
const typeDefs = gql`
    type Product {
        id: ID!
        title: String!
        category: String!
        price: Float!
        inStock: Boolean!
    }

    type Query {
        products: [Product!]!
        product(id: ID!): Product
    }
    
    type Mutation {
        createProduct(
            title : String!
            category : String!
            price : Float!
            inStock : Boolean!
        ): Product
        deleteProduct(id: ID!): Boolean
        updateProduct(
            id : ID!
            title : String
            category : String
            price : Float
            inStock : Boolean
        ): Product
    }
`;

module.exports = typeDefs;