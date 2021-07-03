var text = 'halo pagi, #hai, #greetings #oke \n cek cek _cek __cek \n'
text = text.replace(/,|_|\n/g,'');
var split = text.split(' ')
console.log(split)
var arr_hashtag = [];
for(var i=0; i<split.length; i++){
    if(split[i].substr(0,1)==='#'){
        arr_hashtag.push(split[i]);
    }
}

console.log(JSON.stringify(arr_hashtag))