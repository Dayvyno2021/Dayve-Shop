import React from 'react';

function Alert({message}){
  return (
    <div>
      {alert(message)}
    </div>
  );
}

Alert.prototype={
  message: "Error Occured"
}
export default Alert