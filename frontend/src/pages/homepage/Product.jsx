import {memo} from 'react';
import { Link} from 'react-router-dom';
import Rating from './Rating';
// import PropTypes from 'prop-types'

const Product = ({product}) => {

  return (
    <div className='card' >
      <div className="card--fake">
        <span className='card--fake__strike'>&#8358;{(product.price * 1.1).toLocaleString()} </span> 
        <span className='card--fake__text' >9% off</span>
      </div>
      <Link to={`/product/${product._id}`}>
        <img src={product && product.image? product.image : `/api/products/get/${product._id}`} alt="" className='card--image' />
        {/* <img src={product.image || `/api/products/get/${product._id}`} alt="" className='card--image' /> */}
      </Link>
      <Link to={`/product/${product._id}`} className='link'>
        <h3 className="card--heading">{product.name} </h3>
      </Link>
      <div className="card--element card--price card--element-2">
        <span className="card--title"><strong>Price: </strong></span>
        <p style={{fontWeight:'bold'}}>&#8358;{(product.price).toLocaleString()}</p>
      </div>
      <div className="card--rating">
        <p className="card--title"><strong>Rating: </strong></p>
        <Rating product={product}/>
        <p>
          {product && product.numReviews > 1? 
          `${product && product.numReviews} reviews`
          :
          `${product && product.numReviews} review`
          }
        
        </p> 
      </div>
    </div>
  )
}

export default memo(Product);