import { memo, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { logoutAction } from '../../actions/userActions';
import ProfileScreen from '../../pages/profilepage/ProfileScreen';
import Modal from '../reactPortal/reactPortal';
import NavbarScreen from '../../pages/navbarpage/NavbarScreen';
const Header = () => {
  const dispatch = useDispatch();

  const userProfileReducer = useSelector((state)=>state.userProfileReducer)
  const {userDetails} = userProfileReducer;

  const [show, setShow] = useState(false)
  const [showNav, setShowNav] = useState(false)

  const handleShow = () => {
    setShow(!show);
  }

  const handleShowNav = () =>{
    setShowNav(!showNav)
  }

  return (
    <>
    <header className='header'>
      <nav className='header--container'>
        <Link to={'/'} className='home'>
          <img src="/brand.ico" alt="" className='brand' />
          <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-home"></use></svg>
        </Link>
        <div className="icon--container header--cart">
          <Link to={'/cart/id'} className='rm-deco link'>
            <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-cart"></use></svg>
            <span className='styled-font'>Cart</span>
          </Link>
        </div>

        {
          !userDetails? 
          (
          <div className="icon--container header--links">
            <Link to={'/login'} className='link'>
              <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-user"></use></svg>
              <span className='styled-font'>Login</span>
            </Link>
          </div> 
          )
          :
          (
          <Link to={'/'} className="icon--container link" onClick={()=>dispatch(logoutAction())}>
            <span className='styled-font'>
              <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-switch"></use></svg>
              Logout
            </span>
          </Link>
          )
        }

        {!userDetails && 
        (
        <div className="icon--container">
          <Link to={'/register'} className='link'>
            <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-user-plus"></use></svg>
            <span className='styled-font'>Register</span>
          </Link>
        </div>
        )}
        {userDetails && 
        (
        <div className="icon--container link">
          <p className='styled-font' onClick={handleShow}>
            <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-circle-down"></use></svg>
            {userDetails && userDetails.name} Profile
          </p>
        </div>
        )}
        {
        show && ( <Modal> <ProfileScreen handleShow={handleShow} /></Modal> )
        }
        {/* <div className="header--close header--control">
            <svg className="header--icon"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>
        </div> */}
        <div className="header--open header--control">
          <div onClick={handleShowNav} > 
            <svg className="header--icon link"><use xlinkHref="/img/symbol-defs.svg#icon-menu1"></use></svg>
          </div>
        </div>
          {
            showNav &&  (<Modal><NavbarScreen handleShowNav = {handleShowNav} /></Modal>)
          }
      </nav>
    </header>
    </>
  )
}

export default memo(Header) 