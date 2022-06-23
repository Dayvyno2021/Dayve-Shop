import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction } from '../../actions/productActions';
import Product from './Product';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';

const HomePageScreen = () => {

  const dispatch  = useDispatch();
  const productListReducer  = useSelector((state)=>state.productListReducer);
  const {loading, products, error} = productListReducer;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch])
  

  return (
    <div className='homepage'>
      {loading && <Spinner />}
      {error && <Alert message={error} />} 
      <h1 className="homepage--heading">Latest Products</h1>
      <div className="homepage--products">
        {
          products && products.map((product)=>(
            <Product product={product} key={product._id} />
          ))
        }
      </div>
    </div>
  )
}

export default HomePageScreen