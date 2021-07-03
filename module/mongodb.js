const MongoClient = require("mongodb").MongoClient;
const connectionString = "mongodb://admin_idsos:admin321@127.0.0.1:27017?authSource=admin";

const client = new MongoClient(connectionString, {useUnifiedTopology:true});
(async () => {
    try{
        await client.connect();
    }catch(error){
        console.error(error);
    }
})();

module.exports = client;