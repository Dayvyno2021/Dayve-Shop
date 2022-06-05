// import React, {useState} from 'react';
import { Link} from 'react-router-dom';
import Rating from './Rating';
// import PropTypes from 'prop-types'

const Product = ({product}) => {

  // const [visibility, setVisibility] = useState(false);

  // let cutStr1 = product.description.substr(0, 20);
  // let cutStr2 = product.description.slice(20)


  return (
    <div className='card' >
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt="" className='card--image' />
      </Link>
      <Link to={`/product/${product._id}`} className='link'>
        <h3 className="card--heading">{product.name} </h3>
      </Link>
      <div className="card--element card--price card--element-2">
        <span className="card--title"><strong>Price: </strong></span>
        <p style={{fontWeight:'bold'}}>&#8358;{(product.price).toLocaleString()}</p>
      </div>
      <div className="card--element card--rating card--element-2">
        <span className="card--title"><strong>Rating: </strong></span>
        <Rating product={product}/>
        <span>{product && product.numReviews} reviews</span> 
      </div>



      {/* <div className="card--element card--description card--element-2">
        <span className="card--title"><strong>Desc:</strong></span>
        <p>
          {cutStr1}{!visibility && <span>...</span> } 
          {visibility && <span>{cutStr2} </span> }
          <button className="read--more" onClick={()=>setVisibility(!visibility)}>
            {!visibility ? <span>{'>>'}more{'>>'} </span> : <span>{'<<'}less{'<<'} </span> }
            
          </button>
        </p>
      </div>
 
        <div className="card--element card--price card--element-2">
          <span className="card--title"><strong>Price: </strong></span>
          <p style={{fontWeight:'bold'}}>&#8358; {(600 * product.price).toLocaleString()}</p>
        </div>
        <div className="card--element card--brand card--element-2">
          <span className="card--title"><strong>Brand: </strong></span>
          <p>{product.brand}</p>
        </div>
        <div className="card--element card--category card--element-2">
          <span className="card--title"><strong>Category: </strong></span>
          <p>{product.category}</p>
        </div>
        <div className="card--element card--countInStock card--element-2">
          <span className="card--title"><strong>Count-In-Stock: </strong></span>
          <p>{product.countInStock}</p>
        </div>
        <div className="card--element card--rating card--element-2">
          <span className="card--title"><strong>Rating: </strong></span>
          <Rating product={product}/>
        </div> */}

    </div>
  )
}

export default Product