/**
 * Instead of creating and connecting individual Clients,
 * we will create a "pool" of clients and let our module manager
 * handle the connections for multiple clients as needed.
 * Since the pg package is well-designed, there is no need to change anything else.
 *
 * The pool object also has a "query" method, so the rest of our code will continue to work.
 * Just like with the Client, the connection information is read either directly from the 
 * environment or given as a parameter.
 *
 */
const debug = require('debug')('SQL:log');
const { Pool } = require('pg');

const pool = new Pool();

let queryCount = 0;

module.exports = {
    // We still expose the original client 'just in case'.
    originalClient: pool,

    // We create a method to intercept the requests
    // in order to display them
    // The 'rest' operator is used to transform
    // X variables passed as parameters into an array.
    async query(...params) {
        debug(...params);
        queryCount += 1;
        debug(`Req n°${queryCount}`);

        // Here, the operator has the opposite effect, we transform
        // an array into a list of variables/parameters. This means that the query method of the client
        // will be called exactly the same way as in our module.
        
        return this.originalClient.query(...params);
    },
};