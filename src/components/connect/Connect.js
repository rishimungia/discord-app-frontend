import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import './connect.scss';
import Loader from "../loader/Loader";


const Connect = ({ status, token, userId, userName, connect }) => {
  const connectWallet = () => {
    connect();
  };

  return (
    <div className='main__div'>
      <div className='btn_panel_div'>
        {status === "initializing" || status === "connecting" ?
          <p>Connecting...</p> :
          <>
            <p>Connect Wallet</p>
            <button
              onClick={
                status === "notConnected"
                  ? connectWallet
                  : null
              }
            >
              {status === "unavailable" ?
                <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' target='_blank'><MdOutlineErrorOutline /> Install MetaMask</a>
                : null}

              {status === "notConnected" ?
                <>Connect</>
                : null}
            </button>
          </>
        }
      </div>
    </div>
  )
}
export default Connect;