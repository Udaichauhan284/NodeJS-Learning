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
const Product = require("../models/Products");

const resolvers = {
    Query: {
        products : async () =>  await Product.find({}),
        product: async (_, {id}) => await Product.findById(id),
    },

    Mutation: {
        createProduct : async (_, args) => {
            const newlyCreateProduct = new Product(args);
            return await newlyCreateProduct.save();
        },

        deleteProduct : async (_, {id}) => {
            const deletedProduct = await Product.findByIdAndDelete(id);
            return !deletedProduct;
        },

        updateProduct : async (_, {id, ...updatedFields}) => {
            return await Product.findByIdAndUpdate(id, updatedFields, {new : true});
        },
    },
};

module.exports = resolvers;