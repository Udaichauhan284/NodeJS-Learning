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

    Mutation: {
        createProduct : (_, {title, category, price, inStock}) => {
            const newlyCreateProduct = {
                id : String(products.length + 1),
                title,
                category,
                price,
                inStock
            };

            products.push(newlyCreateProduct);
            return newlyCreateProduct;
        },

        deleteProduct : (_, {id}) => {
            const index = products.findIndex((product) => product.id === id);
            if(index === -1) return false;

            products.splice(index, 1);

            return true;
        },

        updateProduct : (_, {id, ...updates}) => {
            const index = products.findIndex((product) => product.id === id);
            if(index === -1) return null;

            const updateProduct = {
                ...products[index],
                ...updates,
            };

            products[index] = updateProduct;

            return updateProduct;
        },
    },
};

module.exports = resolvers;