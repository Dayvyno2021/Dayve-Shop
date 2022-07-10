import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {/*userProfileAction,  */ userUpdateAction } from '../../actions/userActions';
import Spinner from '../../components/spinner/Spinner'
import { Link } from 'react-router-dom';
import Alert from '../../components/alert/Alert'
import { myOrderDeleteAction, myOrdersAction } from '../../actions/orderActions';
// import { MY_ORDER_DELETE_RESET } from '../../constants/orderConstants';
// import ProfileOrders from './ProfileOrders';

const ProfileScreen = ({handleShow}) => {
  const dispatch = useDispatch();
  const userProfileReducer = useSelector(state=>state.userProfileReducer);
  const {userDetails:user, loading, error} = userProfileReducer;

  const userUpdateReducer = useSelector((state)=>state.userUpdateReducer);
  const {loading: uLoading, error:uError, success: successUpdate} = userUpdateReducer;

  const myOrdersReducers = useSelector((state)=>state.myOrdersReducers);
  const {orders, loading: loadingOrder} = myOrdersReducers;

  const myOrderDeleteReducer = useSelector((state)=>state.myOrderDeleteReducer);
  const {successDel} = myOrderDeleteReducer

  const [alert, setAlert] = useState(false)
  const handleClick = () =>{
    setAlert(false)
  }

  useEffect(()=>{
    if (user && user.name){
      dispatch(myOrdersAction())
      setName(user.name)
      setPassword('')
    } 

  
  }, [dispatch, user, successDel, successUpdate])

  const [name, setName] = useState('');
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')

  const submitUpdate = (event) => {
    event.preventDefault();
    const id = user && user.id
    if (password !== cPassword){
      setAlert(true);
    }else{
      dispatch(userUpdateAction({name, password, id}))
    }
  }

  const datedCreated = (date) => {
    const created = date && date.createdAt && date.createdAt.substring(0, 10).split('-');
    return `${created[2]}-${created[1]}-${created[0]}`
  }
  const datedUpdated = (date) => {
    const updated = date && date.updatedAt && date.updatedAt.substring(0, 10).split('-');
    return `${updated[2]}-${updated[1]}-${updated[0]}`
  }

  const deleteOrder = (id) =>{
    if (window.confirm("Want to delete user?")){
      dispatch(myOrderDeleteAction(id))
    }
  }

  // https://i.pravatar.cc/300
  // https://robohash.org/${user && user.name}.png?size=100x100

  return (
    <div className='profile--container'>
      {alert && <Alert message='Password does not match' handleClick={handleClick} />}
      {(loading || uLoading || loadingOrder) && <Spinner />}
      {(error || uError) && <Alert message={error} />}
      <div className="profile">
        <img src={`https://i.pravatar.cc/100`} alt="" className="profile--image" />
        <form className="profile2">
          <div className="profile2--name">
            <p className="bold7">Name:</p>
            <input type="text" className="profile--input" 
              placeholder={'update name '} name='name' id='name'
              value = {name} onChange={(e)=>setName(e.target.value)} autoComplete='true'
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
              value = {password} onChange={(e)=>setPassword(e.target.value)} autoComplete='true'
            />
            <label htmlFor="pwd">
              <svg className="icon2"><use xlinkHref="/img/symbol-defs.svg#icon-pencil"></use></svg>
            </label>
          </div>
          <div className="profile2--name">
            <p className="bold7">Confirm Password:</p>
            <input type="password" className="profile--input" 
              placeholder='confirm password' name='cPassword' id='pwdc'
              value = {cPassword} onChange={(e)=>setCPassword(e.target.value)} autoComplete='true'
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
            <p className="">{user && user.createdAt && datedCreated(user)}</p>
          </div>
          <div className="profile2--name">
            <p className="bold7">Updated:</p>
            <p className="">{user && user.updatedAt && datedUpdated(user)}</p>
          </div>
          <input type="submit" value={'Update'} className="update__submit btn1" 
            onClick={submitUpdate}
          />
        </form>
        <div className="profile3">
          <h2 className="profile3--heading"><i className="">My Orders</i></h2>
          <table className="profile3--table">
            <thead className="">
              <tr className='profile--row'>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL(&#8358;)</th>
                <th>PAID</th>
                <th>PAYMENT MTD</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
                <th>DEL</th>
              </tr>
            </thead>

          { orders && orders.map((order)=>(
            <tbody  className="profile--row" key={order._id}>
              <tr>
                <td>{order._id}</td>
                <td>{order && datedCreated(order)}</td>
                <td>{(order.totalPrice).toLocaleString()}</td>
                <td>
                  {order.isPaid?
                  (<svg className="icon-green"><use xlinkHref="/img/symbol-defs.svg#icon-checkbox-checked"></use></svg>) 
                  : 
                  (<svg className="icon-red"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>)
                  }
                </td>
                <td>{order.paymentMethod}</td>
                <td>
                  {order.isDelivered? 
                  (<svg className="icon-green"><use xlinkHref="/img/symbol-defs.svg#icon-checkbox-checked"></use></svg>) 
                  : 
                  (<svg className="icon-red"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>)
                  }
                </td>
                <td >
                  <Link to={`/order/${order._id}`} className='rm-deco2' onClick={handleShow} >
                    Details
                  </Link>
                </td>
                <td onClick={()=>deleteOrder(order._id)}>
                  <svg className="icon1"><use xlinkHref="/img/symbol-defs.svg#icon-bin"></use></svg>
                </td>
              </tr>
            </tbody>
            ))
          }
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen