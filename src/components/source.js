import Web3 from "web3";
import {bep20ABI, tokenFactoryABI} from "./abi.js";
import { factoryABI } from "./abi.js";
import { poolABI } from "./abi.js";
import { createChart } from "lightweight-charts"
import {updateFunc} from "./Navbar";
import {updateFuncPhone} from "./Navphone";
import {usdbalupdate,tokenbalupdate,updatetokendata} from "../App";
import { contentChanger, visibleMaker } from "./alert.js";
import { visibleMakerL } from "./loading.js";
import { tkchange } from "./create.js";
import { searched } from "./Manage.js";
import { tradeSearch } from "./TradeContent.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let web3;
let factory;
export let USDAddress;
let dollar;
let connectedAccount;
export let tokenAD=urlParams.get('token');
let tokenSearched=null;
let chart;
let lineSeries;
export let frame='H';
var poolInfo={Address:"0x0000000000000000000000000000000000000000",
    token2usd: null,
    usd2token: null,
    buytax: null,
    saletax: null,
    name:null,
    supply:null,
    ben: null,
    usdinpool:null,
    tokeninpool:null,
    trading:true,
    yesvote:null,
    novote:null,
    thresh:null,
};
var pool;
let chartData


let ref= urlParams.get('ref');

export const getFactoryContract = async ()=>{
    web3 = new Web3(window.ethereum);
    factory = await new web3.eth.Contract(factoryABI,"0x52B6A7AC3afddE908b5544A701775791Fe9217A3");
    USDAddress = await factory.methods.usd().call();
    console.log(USDAddress);
    dollar= await new web3.eth.Contract(bep20ABI,USDAddress);
}

export const connectToWeb3 = async ()=>{

    await window.ethereum.request({method:"eth_requestAccounts"});
    connectedAccount = await web3.eth.getAccounts();
    await updateFunc(connectedAccount[0].slice(0,10)+"...");
    await updateFuncPhone(connectedAccount[0].slice(0,10)+"...");
    await updateBalances();

    const subscription = web3.eth.subscribe(
        "newBlockHeaders",
        async (err, result) => {
            if(tokenAD!=null){ 
                await updatePool();  
            }
             }
       );
}

const updateBalances =async ()=>{
   
    if(connectedAccount!=null){
        usdbalupdate("$"+(await dollar.methods.balanceOf(connectedAccount[0]).call()/1e18).toLocaleString())
        if(tokenAD){
            tokenbalupdate((await tokenSearched.methods.balanceOf(connectedAccount[0]).call()/1e18).toLocaleString())
        }else{
            tokenbalupdate(0);
        }
    }else{
        usdbalupdate("$"+0)
    }
}

export const getPool = async (tokenAddress)=>{
    visibleMakerL("grid");
    tokenAD=tokenAddress
    poolInfo={
        Address:"0x0000000000000000000000000000000000000000",
        token2usd: null,
        usd2token: null,
        buytax: null,
        saletax: null,
        name:null,
        supply:null,
        ben: null,
        usdinpool:null,
        tokeninpool:null,
        trading:true,
        yesvote:null,
        novote:null,
        thresh:null,
    };
    try{
        pool=null;
        var bep20 = await new web3.eth.Contract(bep20ABI,tokenAddress);
        var poolAddress = await factory.methods.TokenToPool(tokenAddress).call();
        pool = await new web3.eth.Contract(poolABI,poolAddress)        
        tokenAD = tokenAddress;        
        console.log(pool._address);
        tokenSearched=bep20;
        await updateBalances();
        var sup = await bep20.methods.totalSupply().call()/1e18
                try{
                    console.log("try")
                    await(poolInfo ={
                    Address:pool._address,
                    token2usd: (await pool.methods.tokenPerUSD().call()/1e18).toLocaleString(),
                    usd2token: (await pool.methods.USDPerToken().call()/1e18).toLocaleString(),
                    buytax: await pool.methods.totalBuyTax().call(),
                    saletax: await pool.methods.totalSaleTax().call(),
                    name: await bep20.methods.name().call(),
                    supply: sup.toLocaleString(),
                    ben: await pool.methods.beneficiery().call(),
                    usdinpool: (await dollar.methods.balanceOf(pool._address).call()/1e18).toLocaleString(),
                    tokeninpool: (await bep20.methods.balanceOf(pool._address).call()/1e18).toLocaleString(),
                    trading: await pool.methods.tradingEnabled().call(),
                    yesvote:await pool.methods.yesVotes().call(),
                    novote:await pool.methods.noVotes().call(),
                    thresh:await pool.methods.DAOThreshold().call()/1e18
                }  )
                console.log(poolInfo.trading);
                await upChart();
                await updatetokendata(poolInfo);
                if(searched){
                 visibleMakerL("none");}

        }
        catch (e){
            console.log("catching")
            var bep20 = await new web3.eth.Contract(bep20ABI,tokenAddress);
            var sup = await bep20.methods.totalSupply().call()/1e18
            await(poolInfo ={
                Address:pool._address,
                token2usd: (await pool.methods.tokenPerUSD().call()/1e18).toLocaleString(),
                usd2token: (await pool.methods.USDPerToken().call()/1e18).toLocaleString(),
                buytax: await pool.methods.totalBuyTax().call(),
                saletax: await pool.methods.totalSaleTax().call(),
                name: await bep20.methods.name().call(),
                supply: sup.toLocaleString(),
                ben: await pool.methods.beneficiery().call(),
                usdinpool: (await dollar.methods.balanceOf(pool._address).call()/1e18).toLocaleString(),
                tokeninpool: (await bep20.methods.balanceOf(pool._address).call()/1e18).toLocaleString(),
                trading: await pool.methods.tradingEnabled().call(),
                yesvote:await pool.methods.yesVotes().call(),
                novote:await pool.methods.noVotes().call(),
                thresh:await pool.methods.DAOThreshold().call()/1e18
            }  )
            if(searched){
                visibleMakerL("none");}

        }
        visibleMakerL("none");

            await updatetokendata(poolInfo);    
        return poolInfo;
    }
    catch(e){
        console.log(e.message);
        try{
            var bep20 = await new web3.eth.Contract(bep20ABI,tokenAddress);
        poolInfo ={
            Address:"0x0000000000000000000000000000000000000000",
            token2usd: 0,
            usd2token: 0,
            buytax: 0,
            saletax: 0,
            name: await bep20.methods.name().call(),
            supply: sup.toLocaleString(),
            ben: null,
            usdinpool: 0,
            tokeninpool:0,
            trading: true,
            yesvote:null,
            novote:null,
            thresh:null
        }
        if(searched){
            visibleMakerL("none");}
        contentChanger("The searched pool does not exist yet");
        visibleMaker("grid");
        if(searched){
            visibleMakerL("none");}
    }
        catch(e){
            console.log(e.message);
        }
    }
    // visibleMakerL("none");
    await updatePool(); 
}

 export const updatePool=async()=>{
    var sup = await tokenSearched.methods.totalSupply().call()/1e18
    
        console.log(pool._address);
        poolInfo ={
            Address:pool._address,
            token2usd: (await pool.methods.tokenPerUSD().call()/1e18).toLocaleString(),
            usd2token: (await pool.methods.USDPerToken().call()/1e18).toLocaleString(),
            buytax: await pool.methods.totalBuyTax().call(),
            saletax: await pool.methods.totalSaleTax().call(),
            name: await tokenSearched.methods.name().call(),
            supply: sup.toLocaleString(),
            ben: await pool.methods.beneficiery().call(),
            usdinpool: (await dollar.methods.balanceOf(pool._address).call()/1e18).toLocaleString(),
            tokeninpool: (await tokenSearched.methods.balanceOf(pool._address).call()/1e18).toLocaleString(),
            trading: await pool.methods.tradingEnabled().call(),
            yesvote:await pool.methods.yesVotes().call(),
            novote:await pool.methods.noVotes().call(),
            thresh: await pool.methods.DAOThreshold().call()/1e18
        }
       await upChart();
        visibleMakerL("none");
    
    await updatetokendata(poolInfo);
    await updateBalances();
    
    
    
}

export const getMaxBalance= async (TKaddress)=>{
    var bep20 = await new web3.eth.Contract(bep20ABI,TKaddress);
    return await bep20.methods.balanceOf(connectedAccount[0]).call()/1e18;    
}

export const buyToken =async (USD)=>{

    USD=web3.utils.toWei(USD);
    try{
        
         var tx= await pool.methods.buyToken(USD).send({from:connectedAccount[0]});
         contentChanger("Transaction Successful");
         visibleMaker("grid");
         updatePool();
        }
    catch(e){
         return [e.message,0];
     }
}

export const sellToken =async (USD)=>{

    USD=web3.utils.toWei(USD);
    try{
        
         var tx= await pool.methods.sellToken(USD).send({from:connectedAccount[0]});
         contentChanger("Transaction Successful");
         visibleMaker("grid");
         updatePool();    }
    catch(e){
        return [e.message,0];
     }
}

export const approveTX = async(tokenToApprove,amount,addressToApprove)=>{
    amount=web3.utils.toWei(amount);
    console.log(tokenToApprove);
     try{
         var tokenContract = await new web3.eth.Contract(bep20ABI,tokenToApprove);
         var tx= await tokenContract.methods.approve(addressToApprove,amount).send({from:connectedAccount[0]});
         contentChanger("Approval Successful");
         visibleMaker("grid");     }
     catch(e){
        console.log(e)
         return [e.message,0];
      }
}

const get1hChartData = async()=>{
    let chartData=[];
    try{
        let data= await pool.methods.showTradeData(60).call();
        for(let i =1; i<data.length; i++){
            chartData.push({time:Number(data[i].time),open:data[i].Open/1e18,low: data[i].Low/1e18,high:data[i].High/1e18,close:data[i].Close/1e18})
        }
        return chartData;
    }
    catch(e){
        console.log(e.message);
    }  
}

const get1mChartData = async()=>{
    let chartData=[];
    try{
        let data= await pool.methods.showTradeData(1).call();
        for(let i =1; i<data.length; i++){
            chartData.push({time:Number(data[i].time),open:data[i].Open/1e18,low: data[i].Low/1e18,high:data[i].High/1e18,close:data[i].Close/1e18})
        }
        return chartData
    }
    catch(e){
        console.log(e.message);
    }
}

const get1dChartData = async()=>{
    let chartData=[];
    try{
        let data= await pool.methods.showTradeData(24).call();
        for(let i =1; i<data.length; i++){
            chartData.push({time:Number(data[i].time),open:data[i].Open/1e18,low: data[i].Low/1e18,high:data[i].High/1e18,close:data[i].Close/1e18})
        }
        return chartData;
    }
    catch(e){
        console.log(e.message);
    }
}

const upChart = async ()=>{
    let data;
    if(frame==='M'){
       data= await get1mChartData()
    }
    if(frame==="H"){
        data=await get1hChartData()
    }
    if(frame==="D"){
        data=await get1dChartData()
    }
    chartData=data
    console.log(data)
    await lineSeries.setData(data); 
}

export const changeFrame = async (fr)=>{
    console.log(fr)
    frame=fr
    await upChart();
}

export const buildChart=async()=>{
    try{lineSeries.setData([]);}
    catch(e){console.log(e.message);}
        let data;
        if(frame==='M'){
          data=  await get1mChartData()
        }
        if(frame==="H"){
           data= await get1hChartData()
        }
        if(frame==="D"){
            data =await get1dChartData()
        }

    document.getElementById('chrt').innerHTML="";
    chart = createChart(document.getElementById("chrt"), { width: document.getElementById("chrt").offsetWidth, height:  document.getElementById("chrt").offsetHeight,
        layout: {
            backgroundColor: '#3C444C',
            textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
            vertLines: {
                color: 'rgba(197, 203, 206, 0)',
            },
            horzLines: {
                color: 'rgba(197, 203, 206, 0)',
            },
        },
        rightPriceScale: {
            borderColor: 'rgba(197, 203, 206, 0)',
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 0)',
        },
            });    
    lineSeries = chart.addCandlestickSeries();
    
   await lineSeries.setData(data);
}

export const requestLiquidityRemoval= async()=>{
    try{
        var tx = await pool.methods.requestLPRemovalDAO().send({from:connectedAccount[0]});
        contentChanger("DAO Voting Started");
        visibleMaker("grid");    }
    catch(e){
        return e.message;
    }
}

export const removeLP = async ()=>{
    var tx = await pool.methods.removeLP().send({from:connectedAccount[0]});
    contentChanger("Liquidity Removed Successfully");
    visibleMaker("grid");}

export const addLiquidity= async(USD,Token)=>{
    USD = web3.utils.toWei(USD);
    Token = web3.utils.toWei(Token);
    try{
        var tx = await pool.methods.addLiquidity(Token,USD).send({from:connectedAccount[0]});
        console.log(tx);
        await getPool(tokenAD);
        contentChanger("Liquidity Added Successfully");
        visibleMaker("grid");    }
    catch(e){
        return [e.message];
    }
}

window.addEventListener("load",()=>{
    chart = createChart(document.getElementById("chrt"), { width: document.getElementById("chrt").offsetWidth, height:  document.getElementById("chrt").offsetHeight,
    layout: {
		backgroundColor: '#3C444C',
		textColor: 'rgba(255, 255, 255, 0.9)',
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0)',
		},
	},
	rightPriceScale: {
		borderColor: 'rgba(197, 203, 206, 0)',
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0)',
	},
})

    lineSeries = chart.addCandlestickSeries();
})

export const createPool=async (buyTax,sellTax,lptax,thresh)=>{
    if(Number(buyTax)+Number(lptax)>30 || Number(sellTax)+Number(lptax)>30){
        alert("Token tax is greater than 30%");
    }else{
    if(!ref){
        ref=factory._address;
        console.log(ref);
    }
    console.log(buyTax,sellTax,lptax);
    thresh=web3.utils.toWei(thresh);
    var tx = await factory.methods.createNewPool(tokenAD,connectedAccount[0],buyTax,sellTax,lptax,thresh,ref).send({from:connectedAccount[0]});
    await getPool(tokenAD);
    poolInfo.buytax=Number(buyTax)+Number(lptax);
    poolInfo.saletax=Number(sellTax)+Number(lptax);
    
    contentChanger("Pool created successfully");
    visibleMaker("grid"); }
}

 export const createToken= async (name_,symbol,supply)=>{
    if(!ref){
        ref=factory._address;
        console.log(ref);
    }    var tokenFactory_=new web3.eth.Contract(tokenFactoryABI,"0xbf7f0d539C0eD9B39d846b5cd15f86032f2D31DA");
            var tx = await tokenFactory_.methods.createSimpleToken(name_,symbol,supply).send({from:connectedAccount[0]});
            var add = await tokenFactory_.methods.lastTkCreated(connectedAccount[0]).call();
            tkchange(add);
            contentChanger("Token created successfully");
            visibleMaker("grid");        

}

export const updatePoolTax=async (buy,sell,lp)=>{
    console.log(buy,sell,lp)
   var tx= await pool.methods.updatePoolTax(buy,sell,lp).send({from:connectedAccount[0]});
   contentChanger("Trade Taxes Updated");
   visibleMaker("grid");    
}


export const voteYes = async()=>{
    var tx = await pool.methods.vote(0).send({from:connectedAccount[0]});
    contentChanger("Vote Casted");
    visibleMaker("grid");
}

export const voteNo = async()=>{
    var tx = await pool.methods.vote(1).send({from:connectedAccount[0]});
    contentChanger("Vote Casted");
    visibleMaker("grid");}

window.addEventListener('resize',()=>{
    document.getElementsByClassName('tv-lightweight-charts')[0].remove();
    document.getElementById('chrt').innerHTML="";
    chart = createChart(document.getElementById("chrt"), { width: document.getElementById("chrt").offsetWidth, height:  document.getElementById("chrt").offsetHeight,
    layout: {
		backgroundColor: '#3C444C',
		textColor: 'rgba(255, 255, 255, 0.9)',
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0)',
		},
	},
	rightPriceScale: {
		borderColor: 'rgba(197, 203, 206, 0)',
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0)',
	},
})

    lineSeries = chart.addCandlestickSeries();
    lineSeries.setData(chartData);
})

window.ethereum.on("accountsChanged",async (acc)=>{
    connectedAccount[0]=acc[0];
    console.log(connectedAccount);
    await updateFunc(connectedAccount[0].slice(0,10)+"...");
    await updateBalances();

  })
  
  window.addEventListener("load",async ()=>{
    if(tokenAD){
        await getPool(tokenAD);
        if(searched){
        searched.current.value=tokenAD}
        if(tradeSearch){
        tradeSearch.current.value=tokenAD}
    }
  })