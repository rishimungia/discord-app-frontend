import React, { useState } from 'react';
import './App.scss';
import Header from "./components/header/Header";
import Loader from "./components/loader/Loader";
import Connect from "./components/connect/Connect";
import { useMetaMask } from "metamask-react";
import Home from "./pages/home/Home";

function App() {
  const [loading, setLoading] = useState(false);
  const { status, connect, account } = useMetaMask();
  const query = window.location.search;
  const userName = new URLSearchParams(query).get('userName');
  const userId = new URLSearchParams(query).get('discordId');
  const token = new URLSearchParams(query).get('token');

  // console.log(userId, token, userName);

  return (
    <main>
      {/* <Header/> */}
      {status === 'connected' ?
          <Home setLoading={setLoading} account={account} token={token} userName={userName} userId={userId} /> :
          <Connect userName={userName} userId={userId} token={token} account={account} status={status} connect={connect} />
      }
      <div className="neon" id={(loading || status === 'connecting' || status === 'initializing') ? 'loading' : status === 'connected' ? (token === null || userId === null || userName === null) ? 'invalid' : 'connected' : ''}>
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
    </main>
  );
}

export default App;
