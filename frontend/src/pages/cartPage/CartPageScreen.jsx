import {useEffect, useRef} from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../../actions/cartActions';
import Cart from './Cart';
import Spinner from '../../components/spinner/Spinner'

const CartPageScreen = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const count = useRef(0)

  const cartReducer = useSelector(state=>state.cartReducer)
  const {cartItems, loading} = cartReducer;

  const qty = location.search? Number(location.search.split('=')[1]) : '';
  
  useEffect(()=>{
    count.current = count.current + 1;
    if (qty) {
      dispatch(addToCartAction(qty, params.id))
    }
  }, [dispatch, qty, params])
  

  let f = cartItems && cartItems.map((value)=>value.qty).reduce((t,v)=>t+v, 0);
  let p = cartItems && cartItems.map((value)=>value.price).reduce((t,v)=>t+v, 0);
  const discount = 0.03*p;
  const bonus = 0.02*p;
  const checkout = p-discount-bonus;

  const deleteFromCart = (id) => {
    dispatch(removeFromCartAction(id))
    navigate('/cart/id')
  }

  return (
    <div className='cartpage'>
      {loading && <Spinner />}
      <div className="cartpage--detail">
        <div className="cartpage--qty price2 ">
          SHOPPING CART({f}) {' '}
          <Link to='/' className='link2' >{' | <'} shop more {'>'} </Link>
        </div>
          {cartItems.length===0 && (
            <div className='cartpage--empty'>
              <h4>Cart Empty</h4>
              <Link to='/' className='link2' >{'<<'}Go back to shopping{'>>'} </Link>
            </div>
          )}
        {
          cartItems && cartItems.map((cartItem)=> (
            <Cart 
              cartItem={cartItem} 
              key={cartItem.product} 
              deleteFromCart={deleteFromCart}
            />
          ))
        }
      </div>
      <div className="cartpage--summary">
        <p className="price2">CART SUMMARY</p>
        <div className="cartpage--summary__total">
          <p className="price-label bold7">PRICE:</p>
          <p className="price1">&#8358; {p && p.toLocaleString()} </p>
        </div>
        <div className="cartpage--summary__total">
          <p className="bold7">Discount (3%):</p>
          <p className="font16">&#8358; {discount && discount.toLocaleString()} </p>
        </div>
        <div className="cartpage--summary__total">
          <p className="bold7">Bonus (2%):</p>
          <p className="font16">&#8358; {bonus && bonus.toLocaleString()} </p>
        </div>
        <Link to={'/login?redirect=shipping'} className='rm-deco'>
          <button className="checkout price1">Checkout (&#8358; {checkout && checkout.toLocaleString()})</button>
        </Link>
      </div>
    </div>
  )
}

export default CartPageScreen