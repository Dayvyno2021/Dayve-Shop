import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Rating from '../homepage/Rating';
import { productDetailsAction } from '../../actions/productActions';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1)
  const params = useParams();


  const productDetailsReducer = useSelector(state=>state.productDetailsReducer);
  const {loading, product:pro, error} = productDetailsReducer;


  useEffect(() => {
    dispatch(productDetailsAction(params.id))
  }, [params, dispatch])
  
  let des1 =pro && pro.description && pro.description.slice(0, 40);
  let des2 =pro && pro.description && pro.description.slice(40);

  const atcHandler = (event) => {
    event.preventDefault();
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return (
    <div className="product">
      {loading && <Spinner/>}
      {error && <Alert message={error}/>}
      <Link className="go-back" to={'/'} >
        <svg className="go-back__icon"><use xlinkHref="/img/symbol-defs.svg#icon-back"></use></svg> 
        <span>back</span> 
      </Link>

      <div className="product--image">
        <img src={pro.image} alt="" />
      </div>

      <div className="product--description">
        <h4 className="product--description__name">{pro.name} </h4>
        <div className="product--element">
          <h4 className="title">Brand: </h4>
          <p className="content">{pro.brand} </p>
        </div>
        <div className="product--element">
          <h4 className="title">Category: </h4>
          <p className="content">{pro.category} </p>
        </div>
        <div className="product--element">
          <h4 className="title">Price: </h4>
          <p className='price' style={{fontWeight:'bold'}}>&#8358; {(Number(pro.price)).toLocaleString()}</p>
        </div>
        <div className="product--element">
          <h4 className="title">Qty in Stock: </h4>
          <p className="content">{pro && pro.countInStock} </p>
        </div>
        <div className="product--element">
          <h4 className="title">Category: </h4>
          <Rating product={pro} />
        </div>
        <div className="product--element">
          <h4 className="title">Number of Reviews: </h4>
          <p className="content">{pro.numReviews} </p>
        </div>
        <div className="product--element">
          <h4 className="title">Description: </h4>
          <p className="content">
            {des1}
            {visible? des2 : ''} {' '}
            <button className='btn-n' onClick={()=>setVisible(!visible)}>{visible? '...less': '...more'} </button> 
          </p>
        </div>
      </div>

      <div className="product--cart">
        <h4 className="product--cart__heading">Make Order</h4>
        <div className="product--cart__element">
          <h4 className="title">Price: </h4>
          <p className='price' style={{fontWeight:'bold'}}>&#8358; {(Number(pro.price)).toLocaleString()}</p>
        </div>
        <div className="product--cart__element">
          <h4 className="title">Status: </h4>
          <p >{pro.countInStock > 0? 'In Stock':'Out of Stock'} </p>
        </div>
        {pro.countInStock>0 && (
        <form onSubmit={atcHandler}>
          <div className="product--cart__element">
            <label htmlFor="qty" className="bold7">Qty</label>
            <select name="qty" id="qty" value={qty} 
            onChange={(e)=>setQty(e.target.value)} 
            className="product--cart__select select1">
              {
                [...Array(pro.countInStock).keys()].map(x=>(
                  <option key={x+1} value={x+1}>{x+1}</option>
                ))
              }

            </select>
          </div>
          <button className="btn-add btn1" type='submit' disabled={pro.countInStock===0} >Add to Cart</button>
        </form>
        )}
      </div>
      <div className="product--reviews">
        <h4 className="product--reviews__heading">Reviews</h4>
      </div>
    </div>
  )
}

export default ProductScreen