import React, {memo} from 'react'

const Alert = ({message, variant}) => {
  return (
    <div className='alert-container' style={{color: variant}}>
      {alert(message)}
    </div>
  )
}

Alert.prototype = {
  variant: 'red',
  meesage: 'Error Occured'
}

export default memo(Alert)