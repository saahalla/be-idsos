const client = require('../module/mongodb')
class Main{
    getCreatioDate(){
        const date = new Date();
        const createAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return createAt;
    }
    // constructor(){
    //     this.dbConnect = client;
    //     this.dbName = 'idsos';
    // }

    // async insert(collection, data){
    //     if(this.dbConnect.isConnected()){
    //         const db = client.db(this.dbName)
    //         const insert = await db.collection(collection).insertOne(data)
    //         return insert.ops

    //     }else{
    //         return false
    //     }
    // }

    // async show(collection, query={}){
    //     if(this.dbConnect.isConnected()){
    //         const db = client.db(this.dbName)
    //         const show = await db.collection(collection).find().toArray()
            
    //         console.log(show)
    //         return show

    //     }else{
    //         return false
    //     }
    // }    
}
module.exports = Main

// user = new Main();
// date = user.getCreatioDate();
// console.log(date)
// show = user.show('users',{});
// console.log(show)