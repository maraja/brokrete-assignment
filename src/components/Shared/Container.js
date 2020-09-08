import React from "react";

const Container = (props) => {
  return (
    <div style={{ 
        margin: '0 15%'
    }}>
      {props.children}
    </div>
  )
};

export default Container;
