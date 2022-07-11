import { memo, useState} from 'react';
import {Link, Outlet, useSearchParams, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { logoutAction } from '../../actions/userActions';
import Modal from '../reactPortal/reactPortal';
import NavbarScreen from '../../pages/navbarpage/NavbarScreen';
import { useCallback } from 'react';
const Header = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const userProfileReducer = useSelector((state)=>state.userProfileReducer)
  const {userDetails} = userProfileReducer;

  const cartReducer = useSelector(state=>state.cartReducer)
  const {cartItems} = cartReducer;

  let f = cartItems && cartItems.map((value)=>value.qty).reduce((t,v)=>t+v, 0);

  const [showNav, setShowNav] = useState(false)

  // const handleShowNav = () =>{
  //   setShowNav(!showNav)
  // }
  const handleShowNav = useCallback(()=>{
    setShowNav(!showNav)
  },[showNav])

  const handleShowNavUp = () =>{
    handleShowNav();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  // eslint-disable-next-line 
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  const search = (event) => {
    event.preventDefault();
    let filter = searchInput || '';
    if (filter) {
      setSearchParams({filter})
    } else {
      setSearchParams({})
    }
    return filter
  }

  return (
    <>
      <header className='header'>
        <nav className='header--container'>
          <Link to={'/'} className='home rm-deco3'>
            <img src="/brand.ico" alt="" className='brand' />
            <i>home</i>
          </Link>

          {
            location.pathname ===('/') &&
            (
            <form className="search">
              <div className="search--group">
                <input type="search" className="header--group__input" id='search' 
                  placeholder='search...' value={searchInput}
                  onChange={(e)=>setSearchInput(e.target.value)}
                />

              </div>
              <button className="search--button" onClick={search}>
                <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-magnifying-glass"></use></svg>
              </button>
            </form>
            )
          }

          {
            location.pathname ===('/page/1') &&
            (
            <form className="search">
              <div className="search--group">
                <input type="search" className="header--group__input" id='search' 
                  placeholder='search...' value={searchInput}
                  onChange={(e)=>setSearchInput(e.target.value)}
                />

              </div>
              <button className="search--button" onClick={search}>
                <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-magnifying-glass"></use></svg>
              </button>
            </form>
            )
          }

          <div className="header--end">
            <div className="header--cart">
              <Link to={'/cart/id'} className='rm-deco link'>
                <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-cart"></use></svg>
                {f===0? <div></div> : <div className='cart--qty'>{f}</div>}
              </Link>
            </div>

            {
              !userDetails? 
              (
              <div className="icon--container header--links header--login">
                <Link to={'/login'} className='link'>
                  <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-user"></use></svg>
                  <span className='styled-font'>Login</span>
                </Link>
              </div> 
              )
              :
              (
              <Link to={'/'} className="icon--container link header--logout" onClick={()=>dispatch(logoutAction())}>
                <span className='styled-font'>
                  <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-switch"></use></svg>
                  Logout
                </span>
              </Link>
              )
            }

            {!userDetails && 
            (
            <div className="icon--container header--register">
              <Link to={'/register'} className='link'>
                <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-user-plus"></use></svg>
                <span className='styled-font'>Register</span>
              </Link>
            </div>
            )}
            <div className="header--open header--control">
              <div onClick={handleShowNavUp} > 
                <svg className="header--icon link"><use xlinkHref="/img/symbol-defs.svg#icon-menu1"></use></svg>
              </div>
            </div>
            {
              showNav &&  (<Modal><NavbarScreen handleShowNav = {handleShowNav} /></Modal>)
            }
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default memo(Header) 