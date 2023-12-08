import React, { useState } from 'react';
import './home.scss';
import { ethers } from "ethers";
import axios from "axios";
import { BsArrowRight } from 'react-icons/bs'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ token, userId, userName, setLoading, account }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const toastOptions = {
    position: "bottom-left",
    type: "success",
    closeButton: false,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    theme: "dark",
    icon: false,
    style: {
      textAlign: 'center',
      borderRadius: '15px',
      color: "rgb(11,249,0)",
      border: "2px solid rgb(11,249,0)",
      paddingBottom: "0.5rem",
      paddingTop: "0.5rem",
      fontSize: "16px",
      fontFamily: "'Silom', sans-serif",
      width: '30rem',
    }
  }

  const cutAddress = (account) => {
    return account?.substring(0, 5) + "...." + account?.substring(account.length - 4);
  };


  const Signer = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const message = `You need to sign this message to verify ownership and connect this account with discord. token - ${token} discordId - ${userId}`
      //const message = `Wallet: ${signer}, DiscordId: ${userId}, Token: ${token}`
      const signature = await signer.signMessage(message)
      return { signature, address, message };
    } catch (e) {
      // console.log(e);
      return false;
    }
  }
  console.log(token)

  const handleSign = async () => {
    setLoading(true)
    const signCheck = await Signer();
    if (!signCheck) {
      toast('Signature denied!', toastOptions)
    } else {
      try {
        const { data } = await axios.post('http://localhost:3000/verify',
          {
            address: signCheck.address,
            message: signCheck.message,
            signature: signCheck.signature,
            userId: userId,
            token: token
          })
        // console.log(data)
        if (data.status === true) {
          // toast('Your account is successfully connected. You can now close this window and head back to discord.', toastOptions)
          // toast('Your wallet has been successfully connected to your DiscordId.', toastOptions)
          setSuccessMessage(`Your're all set! Now close this tab and head back to the server.`)
        } else {
          toast(data.message, toastOptions)
        }
      } catch (e) {
        // console.log('e-----------',e.message)
        toast('Sorry, this link has expired.', toastOptions)
      }
    }
    setLoading(false)
  }

  return (
    <>
      <ToastContainer />
      <div className='main_div'>
        <div className='middle_panel_div'>
          {token === null || userId === null || userName === null ?
            <p>Invalid link</p> : successMessage.length === 0 ?
              <>
                <p>Hello {userName},</p>
                <p>You've connected with {cutAddress(account)}.</p>
                <p>Click below to regain your Discord Role!</p>
                <button onClick={handleSign} className='button'>Authenticate</button>
              </> : <p>{successMessage}</p>
          }
        </div>
      </div>
    </>
  )
}

export default Home;

