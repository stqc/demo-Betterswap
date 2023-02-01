import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import NavbarPhone, { scrollP } from './components/Navphone';
import TradeContent from './components/TradeContent';
import Manage from './components/Manage';
import CreateToken from './components/create';
import Alert from './components/alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';
import { getFactoryContract, connectToWeb3 } from './components/source';
import {useEffect} from 'react';
import Loading from './components/loading';
import { scroll } from './components/TradeContent';

export let usdbalupdate;
export let tokenbalupdate;
export let updatetokendata;
export let tkd;
function App() {

const [currentUSDBal,updateUSDBal] =React.useState('$0')
const [currentTokenBal,updateTokenBal] =React.useState('0')
  usdbalupdate=updateUSDBal;
  tokenbalupdate=updateTokenBal;
  var currentTradeDate={
    Address:"0x0000000000000000000000000000000000000000",
    name:null,
    supply:null,
    token2usd:null,
    usd2token:null,
    buytax:null,
    saletax:null,
    usdinpool:null,
    tokeninpool:null,
    trading:true,
    yesvote:null,
    novote:null,
    thresh:null,
  };
const [currentTrade,updateCurrentTrade]=React.useState(currentTradeDate);
tkd=currentTrade;
updatetokendata=updateCurrentTrade;

  return (
    
    <Router> 
      <Navbar/>
      <NavbarPhone/>
      
      <Alert/>
      <Loading/>
      
      <Routes>
        <Route element={<TradeContent tokenData={currentTrade} currentUSDBal={currentUSDBal} currentTokenBal={currentTokenBal}/>} path="/"/>
        <Route element={<Manage tokenData={currentTrade} currentUSDBal={currentUSDBal} currentTokenBal={currentTokenBal}/>} path="/manage"/>
        <Route  element={<CreateToken/>} path="/create"/>
      </Routes>
    </Router>
  );
}

export default App;
