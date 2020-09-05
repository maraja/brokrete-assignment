import React from "react";

const CentreContainer = (props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh'}}>
      {props.children}
    </div>
  )
};

export default CentreContainer;
