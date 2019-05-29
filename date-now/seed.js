Eutil=require('ethereumjs-util');

EcommerceStore = artifacts.require("EcommerceStore");
module.exports = function (callback) {
	current_time=Math.round(new Date()/1000);

	 amt_1 =web3.utils.toWei("1", 'ether');


EcommerceStore.deployed().then(function(i){i.addProductToStore('iphone5', 'Cell Phone & accessories',
	'QmafgGoMHJnLuXnaTyouTDtY7pnJKVtYdGnVjHF8N4aNSR', 'Qmf83PcasHYh798caVWC4WB5cr6mJzp9gvFCHqxABzXptY', current_time,current_time +200,2*amt_1,0).then(function(f){console.log(f)})});

EcommerceStore.deployed().then(function(i){i.addProductToStore('iphone5s', 'Cell Phone & accessories',
	'QmafgGoMHJnLuXnaTyouTDtY7pnJKVtYdGnVjHF8N4aNSR', 'Qmf83PcasHYh798caVWC4WB5cr6mJzp9gvFCHqxABzXptY', current_time,current_time +400,3*amt_1,1).then(function(f){console.log(f)})});

EcommerceStore.deployed().then(function(i){i.addProductToStore('iphone6', 'Cell Phone & accessories',
	'QmafgGoMHJnLuXnaTyouTDtY7pnJKVtYdGnVjHF8N4aNSR', 'Qmf83PcasHYh798caVWC4WB5cr6mJzp9gvFCHqxABzXptY', current_time,current_time +14,amt_1,0).then(function(f){console.log(f)})});

EcommerceStore.deployed().then(function(i){i.addProductToStore('iphone6s', 'Cell Phone & accessories',
	'QmafgGoMHJnLuXnaTyouTDtY7pnJKVtYdGnVjHF8N4aNSR', 'Qmf83PcasHYh798caVWC4WB5cr6mJzp9gvFCHqxABzXptY', current_time,current_time +86400,4*amt_1,1).then(function(f){console.log(f)})});

EcommerceStore.deployed().then(function(i){i.addProductToStore('iphone5', 'Cell Phone & accessories',
	'QmafgGoMHJnLuXnaTyouTDtY7pnJKVtYdGnVjHF8N4aNSR', 'Qmf83PcasHYh798caVWC4WB5cr6mJzp9gvFCHqxABzXptY', current_time,current_time +86400,5*amt_1,1).then(function(f){console.log(f)})});

EcommerceStore.deployed().then(function(i){i.addProductToStore('iphone5', 'Cell Phone & accessories',
	'QmafgGoMHJnLuXnaTyouTDtY7pnJKVtYdGnVjHF8N4aNSR', 'Qmf83PcasHYh798caVWC4WB5cr6mJzp9gvFCHqxABzXptY', current_time,current_time +86400+86400+86400,5*amt_1,1).then(function(f){console.log(f)})});


EcommerceStore.deployed().then(function(i){i.productindex.call().then(function(f){console.log(f)})});

}