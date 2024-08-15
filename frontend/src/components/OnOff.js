import React from 'react';
import './classstyle/OnOff.css';

function OnOff({isOn,setIsOn}) {

  const handleClick = () => {
    setIsOn(prevState => !prevState);
  };

  return (
    <div style={{marginTop:'8px'}}>
        <div style={{display:'inline-block',verticalAlign:'middle',marginRight:'10px',fontFamily:"Arial",color:"white"}}>Custom</div>
        <div className={`switch ${isOn ? 'on' : 'off'}`} onClick={handleClick} style={{verticalAlign:'middle'}}>
            <div className="slider"></div>
        </div>
        <div style={{display:'inline-block',verticalAlign:'middle',marginLeft:'10px',fontFamily:"Arial",color:"white"}}>Generate</div>
    </div>
  );
}

export default OnOff;