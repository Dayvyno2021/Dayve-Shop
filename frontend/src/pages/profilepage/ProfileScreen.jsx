import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { userProfileAction, userUpdateAction } from '../../actions/userActions';
import Spinner from '../../components/spinner/Spinner'
import Alert from '../../components/alert/Alert'

const ProfileScreen = ({handleShow}) => {
  const dispatch = useDispatch();
  const userProfileReducer = useSelector(state=>state.userProfileReducer);
  const {userDetails:user, loading, error} = userProfileReducer;
  const userUpdateReducer = useSelector((state)=>state.userUpdateReducer);
  const {loading: uLoading, error:uError} = userUpdateReducer;

  useEffect(()=>{
    if (!user) dispatch(userProfileAction())
  }, [dispatch, user])

  const [uInput, setUinput] = useState(
    {
      name: user && user.name,
    }
  )

  const handleUpdate = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    setUinput(values=>({...values, [name]: value}))
  }

  const submitUpdate = (event) => {
    event.preventDefault();
    const {name, password} = uInput
    const id = user && user.id
    dispatch(userUpdateAction({name, password, id}))
  }

  const datedCreated = (date) => {
    const created = date && date.createdAt && date.createdAt.substring(0, 10).split('-');
    return `${created[2]}-${created[1]}-${created[0]}`
  }
  const datedUpdated = (date) => {
    const updated = date && date.updatedAt && date.updatedAt.substring(0, 10).split('-');
    return `${updated[2]}-${updated[1]}-${updated[0]}`
  }

  // https://i.pravatar.cc/300
  // https://robohash.org/${user && user.name}.png?size=100x100

  return (
    <div className='profile--container'>
      {(loading || uLoading) && <Spinner />}
      {(error || uError) && <Alert>{error}</Alert>}
      <div className="profile">
        <button onClick={handleShow} className='profile--close'>
          <svg className=""><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>
        </button>
        <img src={`https://i.pravatar.cc/100`} alt="" className="profile--image" />
        <form className="profile2">
          <div className="profile2--name">
            <p className="bold7">Name:</p>
            <input type="text" className="profile--input" 
              placeholder={'update name '} name='name' id='name'
              value = {uInput.name || '' } onChange={handleUpdate} autoComplete='true'
            />
            <label htmlFor="name">
              <svg className="icon2"><use xlinkHref="/img/symbol-defs.svg#icon-pencil"></use></svg>
            </label>
          </div>
          <div className="profile2--name">
            <p className="bold7">Email:</p>
            <p className="">{user && user.email}</p>
          </div>
          <div className="profile2--name">
            <p className="bold7">Password:</p>
            <input type="password" className="profile--input" 
              placeholder={'  update password'} name='password' id='pwd'
              value = {uInput.password || ''} onChange={handleUpdate} autoComplete='true'
            />
            <label htmlFor="pwd">
              <svg className="icon2"><use xlinkHref="/img/symbol-defs.svg#icon-pencil"></use></svg>
            </label>
          </div>
          <div className="profile2--name">
            <p className="bold7">Confirm Password:</p>
            <input type="password" className="profile--input" 
              placeholder='confirm password' name='cPassword' id='pwdc'
              value = {uInput.cPassword || ''} onChange={handleUpdate} autoComplete='true'
            />
            <label htmlFor="pwdc">
              <svg className="icon2"><use xlinkHref="/img/symbol-defs.svg#icon-pencil"></use></svg>
            </label>
          </div>
          <div className="profile2--name">
            <p className="bold7">Admin:</p>
            <p className="">
              {
                user && user.isAdmin? 
                <svg className="admin--icon__yes"><use xlinkHref="/img/symbol-defs.svg#icon-check"></use></svg>
                :
                <svg className="admin--icon__no"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>
              }
            </p>
          </div>
          <div className="profile2--name">
            <p className="bold7">Created:</p>
            <p className="">{user && datedCreated(user)}</p>
          </div>
          <div className="profile2--name">
            <p className="bold7">Updated:</p>
            <p className="">{user && datedUpdated(user)}</p>
          </div>
          <input type="submit" value={'Update'} className="update__submit btn1" 
            onClick={submitUpdate}
          />
        </form>
        <div className="profile3 bold7">
          ORDER DETAILS
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen