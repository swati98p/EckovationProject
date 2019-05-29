import "styles/app.css";

import{ default as Web3}from 'web3';
import {default as contract } from 'truffle-contract'
import ecommerce_store_artifacts from '../../build/contracts/EcommerceStore.json'
 
var EcommerceStore = contract(ecommerce_store_artifacts);
 
const ipfsAPI =require('ipfs-api');
const ethUtil =require('ethereumjs-util');

 const ipfs=ipfsAPI({host: 'localhost' ,port: '5001', protocol:'http'});

window.APP= {
start:function() {
var self= this;
EcommerceStore.setProvider(web3.currentProvider);
renderStore();
var reader;
 $("#product-image").change(function(event){
 	const file=event.target.files[0]
 	reader =new window.fileReader()
 	reader.readArraysAsBuffer(file)
 });
  $("#add-item-to-store").submit(function(v){
     const req=$("add-item-to-store").serialize();
     let params =JSON.parse('{ "' + req.replace(/"/g,'\\" ').replace(/&/g, '" ," ').replace(/=/g, '" ;" ') + ' "}');
     let decodeparams={}
      Object.keys(params).forEach(function(v){
      	  decodeparams[v] = decodeURIComponent(decodeURI(params[v]));
      });

      saveProduct(reader,decodeparams);
      event.preventDefault();
  })

if($("#product-details").length > 0){
	let productId= new URLSearchParams(window.location.search).get('id');
	renderProductDetails(productId);
}
$("#bidding").submit(function(event){
	$("#msg").hide();
	let amount =$("#bid-send-amount").val();
	let sendAmount=$("#secret-text").val();
	let sealedBid=  '0x'+ethUtil.sha3(web3.toWei(amount,'ether') +secretText).toString('hex');
	let productId=$("#product-id").val();
	console.log(sealedBid + "for"+ productId);
	EcommerceStore.deployed().then(function(i){
		i.bid(parseInt(productId),sealedBid,{value:web3.toWei(sendAmount),from:web.eth.accounts[1],gas:440000}).then(
			function(f){
				$("#msg").html("Your bid has been successfully submited");
							$("#msg").show();

		       console.log(f);
			}
			)
	});
event.preventDefault();
});
//revealBid
$("#revealing").submit(function(event){
	$("#msg").hide();
	let amount =$("#actual-amount").val();
	let secretText=$("#revealsecret-text").val();
	let productId=$("#product-id").val();
	EcommerceStore.deployed().then(function(i){
		i.revealBid(parseInt(productId),web3.toWei(amount).toString(),secretText,(from:web.eth.accounts[1],gas:440000}).then(

			function(f){
			$("#msg").show();
		$("#msg").html("Your bid has been successfully revealed");

		       console.log(f);
			}
			)
	});
event.preventDefault();
});

$("release-funds").click(function(){
	let productId = newURLSearchParams(window.location.search).get('id');
	EcommerceStore.deployed().then(function(f){
		$("#msg").html("your transaction has been submitted.Pleasewait for few seconds for the confirmation").show();
		consolo.log(f);
		location.reload();
	}).catch(function(e){
		console.log(e);
	})
	});
});



}

}

function renderStore(){
  EcommerceStore.deployed().then(function(i){
    i.getProduct.call(1).then(function(p){
      $("#product-list").append(buildProduct(p));
    });
    i.getProduct.call(2).then(function(p){
      $("#product-list").append(buildProduct(p));
  });
});
}
function buildProduct(product){
  let node =$("div/>");
  node.addClass("col-sm-3 text-center col-margin-bottom-1");
  node.append("img src ='https://localhost:8081/ipfs/" + product[3] + "' width = '150px'   />");
  node.append("<div>" + product[1]+"</div>");
  node.append("<div>" + product[2]+"</div>");
  node.append("<div>" + product[5]+"</div>");
  node.append("<div>" + product[6]+"</div>");
  node.append("<div>Ether " + product[7]+"</div>");
  return node;

}


//Ipfs
$("#product-image").change(function(event){
const file= event.target.file[0];
reader =new.window.fileReader();
reader=readArraysAsBuffer(file);
})
function saveImageOnIpfs(reader){
	return new Promise(function(resolve,reject)){
		const buffer =Buffer.from(reader.result);
		ipfs.add(buffer).then((response)=>{
			console.log(response);
			resolve(response[0].hash);
		}).catch(err)=>{
			console.log(err);
			reject(err);
		})
	})
}

function saveTextBlobOnIpfs(blob){
		return new Promise(function(resolve,reject){
const descBufffer =buffer.from(blob,'utf-8');
ipfs.add(descBuffer).then(response)=>{
console.log(response);
resolve(response[0].hash)
}).catch(err)=>{
			console.log(err);
			reject(err);
		})
}}
}

function saveProduct(reader,decodeparams){
	let imageId, descId;
	saveImageOnIpfs(reader).then(function(id){
		imageId=id;
		saveTextBlobOnIpfs(decodeparams["product-description"]).then(function(id){
			descId=id;
			saveProductToBlockchain(decodeparams. imageId,descId);

		})
	})
}
function saveProductToBlockchain(params,imageId,descId){
	console.log(params);
	let auctionStartTime =Date.parse(params["product-auction-end"])/1000;
	let auctionEndTime =auctionStartTime + parseInt(params["product-auction-end"])24*60*60;
EcommerceStore.deployed(.then(function(i){
	i.addProductToStore(params["product-name"],params["product-category"],imageId,descId,auctionStartTime,auctionEndTime,web3.to.utils..Wei(params["product-price"],'ether'),parseInt(params[" product-condition"]),{from: web3.eth.account[0],gas: 440000}).thn(function(f){
console.log(f);
 $("#msg").show();
 $("#msg").html("Your produc was successfully added to your store");

	})
		});
}

//fetchProduct
function renderProductDetails(productId){
	EcommerceStore.deployed().then(function(i){
		i.getProduct.call(productId).then(function(p){

			console.lof(p);
			let content="";
			ipfs.cat(p[4]).then(function(fie){
				content=file.toString();
				$("#product-image").append("<img src ='http://localhost:8081/ipfs" +p[3]) + "' width ='250px' />");
			    $("#product-price").html(displayPrice(p[7]));
                  $("#product-name").html(p[1].name);
           	    $("#product-auction-end").html(displayEndHours(p[6]));
                 $("#product-id").val(p[0]);
                 $("#revealing, #bidding , #finalize-auction, #escrow-info").hide();
                let currentTime=getCurrentTimeInSeconds();
if (parseInt(p[8])==1){
	EcommerceStore.deployed().then(function(f){
		if(f[2].toLocaleString()=='0'){
			$("#product-status").html("Auction has ended.No bids were revealed");

		}else{
			$("#product-status").html("Auction has ended.Product sold To" + f[0] 
				+"for"+displayPrice(f[2])+ "The oney in the escrow.two of the three participants(Buyer,Seller ans Arbiter)have to "+ "either release the funds to seller or refund the money to the buyer");

		}
	})
       i.escrowInfo.call(productId).then(function(f){
       	$("#buyer").html('Buyer: '+ f[0]);
       	$("#seller").html('Seller: '+ f[1]);
	$("#arbiter").html('Arbiter: '+ f[2]);
	if(f[3]==true){
		$("#release-count").html("Amount from the escrow has been released");
	}else{
				$("#release-count").html(f[4]+   "of 3 participants have agreed to release funds");
		$("#release-count").html(f[5]+   "of 3 participants have agreed to refund the buyer");
}
    })
})
	}else if(parseInt(p[8])==2){
           $("#product-status").html("Product was not sold");
	}
	
}else if (currentTime<parseInt(p[6])){
	                $("#bidding").show();
}else if(currentTime<(parseInt(p[6]) + 600)){
		                $("#revealing").show();
}else {
		                $("#finalize-auction").show();

}
              
                	})
		})
	
}

function getCurrentTimeInSeconds(){
	return Math.round(new Date( )/1000);
}
function displayPrice(amt){
	return '' +web3.utils.fromWei(amt, 'ether');
}
function displayEndHours(seconds){
	let currentTime=getCurrentTimeInSeconds()
	let remaining_seconds=seconds-current_time;
	if(remaining_seconds<=0){
		return "Auction has ended"	;
	}

	let days=Math.trunc(remaining_seconds / (24*60*60));
	remaining_seconds-=hours*60*60;
	let minutes=Math.trunc(remaining_seconds / 60);

    if (days>0){
    	return "Auction ends in" + days + "days,"+ hours+",hours,"+ minutes + "minutes";
    }else if(hours>0){
    	    	return "Auction ends in" +  hours+",hours,"+ minutes + "minutes";

    }else if(minutes>0){
    	    	return "Auction ends in" + minutes + "minutes";

    }else{
    	    	return "Auction ends in" + remaining_seconds+ " seconds";
}
  }

//Finalize
$("#finalize-auction").submit(function(event){
	$("#msg.").hide();
	let productId=$("#product-id").val();
	EcommerceStore.deployed().then(function(i){
		i.finalizeAuction(parseInt(productId),{from:web.eth.accounts[2],gas:4400000}).then(
			function(f){
											
$("#msg").show();
$("#msg").html("The auction has been finalized and winner declared.");
		       console.log(f)
		       location.reload();
			}
		).catch(function(e){
			console.log(e);
			$("#msg").show();
           $("#msg").html("the auctioncan not be finalized by the buyer or thte seller,only a third party arbiter can finalize it");

		})
});
		event.preventDefault();
	});


window.addEventListener('load', function(){

if(typeof web3 !== 'undefined'){
console.warn("using web3 detected from external source.Tf you find that your accounts don't appear or you have 0 MetaCoin,ensure you've confgured that source property.If using MetaMask,see the following limk.Feel free todelete this warning. :)http://truffleframework.com/tutorials/truffle-and-metamask")
window.web3 =new Web3(web3.currentProvider);
}
else{
console.warn("No web3 detected.Falling ack to http://localhost:8545.You should remove thisfallback when you deploy live ,as its inherently insecure. Consider //fallback -use your fallback strategy(local node/hostedd node + in-dapp id mgmt/ fail")
window.web3 =new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
App.start();
});