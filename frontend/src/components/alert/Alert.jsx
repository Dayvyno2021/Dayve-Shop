import {memo} from 'react';

function Alert({message, handleClick}){

  const closeAlert = () =>{
    const child = document.getElementsByClassName('closebtn')[0];
    return child.parentElement.style.display='none'
  }

  return (
    <div className="alert" onClick={handleClick}>
      <span className="closebtn" onClick={closeAlert} >&times;</span>
      <strong>Error!</strong> {message}
    </div>
  );
}

Alert.prototype={
  message: "Error Occured"
}
export default memo(Alert);