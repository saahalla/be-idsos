"use strict";
const fetch = require('node-fetch');
const __date = require('date-and-time');
const __helper = require(__class_dir+'/helper.class.js');
const helper = new __helper();

class main{
	constructor(){
		this.prefix_va = '988';

		/*------------ dev -------------- */
		//~ this.secret_key = '2181e1ae7b878221f7a2df2aab50acbf';
		//~ this.client_id = '00333'; //dev
		//~ this.urlAPI = 'https://apibeta.bni-ecollection.com/createbilling';
		//~ this.urlPayment = 'http://dev.bni-ecollection.com';
		/*------------ dev -------------- */

		/*------------ live -------------- */
		this.secret_key = '6d5bdaf5fe4d8e5374685c7e94f2dd2a';
		this.client_id = '00474'; //live Rek YCD
		//~ this.client_id = '00475'; //live Rek PT CDA
		this.urlAPI = 'https://api.bni-ecollection.com/createbilling';
		this.urlPayment = 'http://dev.bni-ecollection.com';
		/*------------ live -------------- */


		this.prefix_va += this.client_id;
		this.va_length = (16 - this.prefix_va.length);
	}

	deleteEmptyParameters(data){
		for(let key in data){
			if(data[key] === '' || data[key] === null )
				delete data[key];
		}

		return data;
	}

	callBNI(url,options,raw_data=null){
		return fetch(url,options)
			.then(results=>results.text())
			.then(results=>{
				results = JSON.parse(results);

				if(results.status !== '000'){
					if(results.status === '102' && raw_data !== null)
						results.virtual_account = raw_data.virtual_account;

					return new Promise((resolve,reject)=>{
						reject(JSON.stringify(results));
					});
				}

				let decrypted_data = decrypt(results.data,this.client_id,this.secret_key);
				console.dir('>>>> BNI : ',decrypted_data, {depth:null});
				//~ return {
					//~ status:true,
					//~ data:decrypted_data,
				//~ };
				return decrypted_data;
			})
			.catch(error=>{
				console.error("callBNI Error : ",error);
				try{
					error = JSON.parse(error);
				}
				catch{
					error = error;
				}

				let response = {
					status:false,
					error:error,
				};

				if(error.status === '102'){
					response.virtual_account = error.virtual_account;
				}

				return response;
			});
	}

	prepareData(raw_data){
		raw_data = this.deleteEmptyParameters(raw_data);

		let encrypted_data = encrypt(raw_data,this.client_id,this.secret_key);

		let sent_data = JSON.stringify({
				client_id : helper.checkUndefined(raw_data.client_id,this.client_id),
				data : encrypted_data,
			});

		console.log('---options BNI-----');
		console.dir(raw_data,{depth:null});
		console.dir(sent_data,{depth:null});
		console.log('-------------------');

		return {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"user-agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36",
				},
				body: sent_data,
			};
	}

	createBilling(data={}){
		let date = new Date();
		let trx_id = helper.checkUndefined(data.client_id,this.client_id)+'_'+String(date.getTime());
		//~ let expired_date = 	new Date(
													//~ String(
													//~ helper.checkUndefined(
														//~ data.datetime_expired+'T23:59:59.999Z', //add hour to date
														//~ (helper.dateAddition(new Date(),90))),
														//~ '')
												//~ ).toISOString();
		let expired_date;
		if(data.datetime_expired===null ||data.datetime_expired===undefined ||data.datetime_expired===''){
			expired_date = helper.dateAddition(new Date(),90);
			expired_date = expired_date.toISOString();
		}
		else{
			if(__date.isValid(data.datetime_expired,"YYYY-MM-DDTHH:mm:ss.SSSZ")){
				expired_date = data.datetime_expired;
			}else{
				expired_date =new Date( data.datetime_expired+'T23:59:59.999Z' );
				expired_date = expired_date.toISOString();
				// expired_date = __date.format(expired_date, "YYYY-MM-DDTHH:mm:ss.SSSZ");
			}
		}

		trx_id = trx_id.substring(0,30);

		let raw_data = {
				'type' : 'createbilling',
				'client_id' : helper.checkUndefined(data.client_id,this.client_id),
				'trx_id' : helper.checkUndefined(data.trx_id,trx_id),
				'trx_amount' : helper.checkUndefined(data.trx_amount),
				'billing_type' : helper.checkUndefined(data.billing_type,'c'),
				'customer_name' : helper.checkUndefined(data.customer_name),
				'customer_phone' : helper.checkUndefined(data.customer_phone),
				'customer_email' : helper.checkUndefined(data.customer_email),
				'virtual_account' : helper.checkUndefined(data.virtual_account,undefined,''),
				'datetime_expired' : expired_date,
				'description' : String(helper.checkUndefined(data.description)).slice(0,100),
			};

		if(!raw_data.customer_email.includes('@'))
			delete raw_data.customer_email;

		if(raw_data.virtual_account === '' || raw_data.virtual_account === null)
			delete raw_data.virtual_account;
		else{
			if(raw_data.virtual_account.length <= this.va_length){
				raw_data.virtual_account = this.prefix_va+raw_data.virtual_account.padStart(this.va_length, '0');
			}
			else{
				raw_data.virtual_account = this.prefix_va+raw_data.virtual_account.slice(-this.va_length);
			}
		}

		let options = this.prepareData(raw_data);

		return this.callBNI(this.urlAPI,options,raw_data);
	}

	inquiryBilling(data={}){
		let raw_data = {
				'type' : 'inquirybilling',
				'client_id' : helper.checkUndefined(data.client_id,this.client_id),
				'trx_id' : helper.checkUndefined(data.trx_id,''),
			};

		let options = this.prepareData(raw_data);

		return this.callBNI(this.urlAPI,options);
	}

	updateBilling(data={}){
		let date = new Date();
		let expired_date = 	new Date(
													String(
													helper.checkUndefined(
														data.datetime_expired+'T23:59:59.999Z', //add hour to date
														(helper.dateAddition(new Date(),90))),
														'')
												).toISOString();

		let raw_data = {
				'type' : 'updatebilling',
				'client_id' : helper.checkUndefined(data.client_id,this.client_id),
				'trx_id' : helper.checkUndefined(data.trx_id,''),
				'trx_amount' : helper.checkUndefined(data.trx_amount),
				'customer_name' : helper.checkUndefined(data.customer_name),
				'customer_phone' : helper.checkUndefined(data.customer_phone),
				'customer_email' : helper.checkUndefined(data.customer_email),
				'datetime_expired' : expired_date,
				'description' : helper.checkUndefined(data.description),
			};

		let options = this.prepareData(raw_data);

		return this.callBNI(this.urlAPI,options);
	}

	decrypt(hashed_string, cid, sck) {
		let parsed_string = doubleDecrypt(hashed_string, cid, sck);
		let dot_pos = parsed_string.indexOf('.');
		if (dot_pos < 1)
			return null;
		let ts = parsed_string.substr(0, dot_pos);
		let data = parsed_string.substr(dot_pos + 1);
		if (tsDiff(ts.split('').reverse().join('')) === true) {
			return JSON.parse(data);
		}
		return null;
	}
}


// Codes below are from BNI Documentation
function TIME_DIFF_LIMIT() { return 300; }

function tsDiff(ts) { return Math.abs(ts - Math.round(+new Date() / 1e3)) <= TIME_DIFF_LIMIT(); }

function str_pad(str, length, pad_char, pad_left) {
	while (str.length < length) {
		str = pad_left ? pad_char + str : str + pad_char;
	}
	return str;
}

function dec(str, sck) {
	let res = '';
	let strls = str.length;
	let strlk = sck.length;
	for (let i = 0; i < strls; i++) {
		let chr = str.substr(i, 1);
		let keychar = sck.substr((i % strlk) - 1, 1);
		chr = String.fromCharCode(((chr.charCodeAt() - keychar.charCodeAt()) + 256) % 128);
		res += chr;
	}
	return res;
}

function enc(str, sck) {
	let res = '';
	let strls = str.length;
	let strlk = sck.length;
	for (let i = 0; i < strls; i++) {
		let chr = str.substr(i, 1);
		let keychar = sck.substr((i % strlk) - 1, 1);
		chr = String.fromCharCode((chr.charCodeAt() + keychar.charCodeAt()) % 128);
		res += chr;
	}
	return res;
}

function doubleDecrypt(str, cid, sck) {
	let res = Buffer.from(str_pad(str, Math.ceil(str.length / 4) * 4, '=', 0).replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
	res = dec(res, cid);
	res = dec(res, sck);
	return res;
}

function doubleEncrypt(str, cid, sck) {
	let res = '';
	res = enc(str, cid);
	res = enc(res, sck);
	return Buffer.from(res, 'utf8').toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function encrypt(json_data, cid, sck) {
	return doubleEncrypt(('' + Math.round(+new Date() / 1e3)).split('').reverse().join('') + '.' + JSON.stringify(json_data), cid, sck);
}

function decrypt(hashed_string, cid, sck) {
	let parsed_string = doubleDecrypt(hashed_string, cid, sck);
	let dot_pos = parsed_string.indexOf('.');
	if (dot_pos < 1)
		return null;
	let ts = parsed_string.substr(0, dot_pos);
	let data = parsed_string.substr(dot_pos + 1);
	if (tsDiff(ts.split('').reverse().join('')) === true) {
		return JSON.parse(data);
	}
	return null;
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    main: main,
};
