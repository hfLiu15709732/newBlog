import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Notification = ({type,position,data,lastTime}) => {

    useEffect(()=>{
        if(lastTime=="slow"){
            lastTime=3000
        }
        else if(lastTime=="mid"){
            lastTime=5000
        }
        else if(lastTime=='long'){
            lastTime=7000
        }
        toast(data,{
            type:type,
            position:position,
            autoClose:lastTime,
        })
    },[])

  return (
    <div>
        <ToastContainer/>
    </div>
  );
};

export default Notification;