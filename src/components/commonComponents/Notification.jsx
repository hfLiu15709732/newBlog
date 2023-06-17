import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PDFPreview = ({ type,position,data,lastTime}) => {

    useEffect(()=>{
        if(lastTime=="slow"){
            lastTime=3
        }
        else if(lastTime=="mid"){
            lastTime=5
        }
        else if(lastTime=='long'){
            lastTime=7
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

export default PDFPreview;