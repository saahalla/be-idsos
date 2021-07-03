const client = require('../module/mongodb')
class Post{
    constructor(){
        this.dbConnect = client
    }
    getHashtag(str){
        str = str.replace(/,|_|\n/g,'');
        var split = str.split(' ')
        var arr_hashtag = [];
        for(var i=0; i<split.length; i++){
            if(split[i].substr(0,1)==='#'){
                var split2 = split[i].split('#')
                console.log(split[i])
                for(var j=0; j<split2.length; j++){
                    if(split2[j] !== null && split2[j] !== ''){
                        arr_hashtag.push(`#${split2[j]}`);
                    }
                }
                
            }
        }
        return arr_hashtag
    }
    addPost(){
        
    }
}
module.exports = Post;
// var text = 'halo pagi, #hai, #greetings #oke \n cek cek _cek __cek \n'
// ht = new Post;
// hastag = ht.getHashtag(text);
// console.log(hastag)