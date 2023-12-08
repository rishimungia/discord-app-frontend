import React from "react";
import './loader.scss';
import loader from '../../assets/loading-loop-unscreen.gif'

const Loader = ({loading}) => {

  return (
    <>
      <div className={`loading_div ${(loading) && 'loading_div_display'}`}>
        <img className='loading_img' src={loader} alt='loading..'/>
      </div>
    </>
  )
}
export default Loader;