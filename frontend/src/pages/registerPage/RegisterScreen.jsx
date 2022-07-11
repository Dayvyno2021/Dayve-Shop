import React,{useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { userRegisterAction } from '../../actions/userActions';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert'
import { useCallback } from 'react';

const RegisterScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search? location.search.split('=')[1] : '';

  const [input, setInput] = useState({});
  const [alert, setAlert] = useState(false)

  // const handleClick = () =>{
  //   setAlert(false)
  // }

  const handleClick = useCallback(()=>{
    setAlert(false)
  },[])

  const userRegisterReducer = useSelector((state)=>state.userRegisterReducer);
  const {loading, userDetails, error} = userRegisterReducer;

  const handleInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setInput((values)=>({...values, [name]:value}))
  }

  useEffect(()=>{
    if (userDetails){
      navigate(`/${redirect}`)
    }
  }, [navigate, userDetails, redirect])


  // let myInput = document.getElementById("password");
  let letter = document.getElementById("letter");
  let capital = document.getElementById("capital");
  let number = document.getElementById("number");
  let length = document.getElementById("length");

  // When the user clicks on the password field, show the message box
  const handleFocus = () => {
    document.getElementById("message").style.display = "block";
  }

  // When the user clicks outside of the password field, hide the message box
  const handleBlur = function() {
    document.getElementById("message").style.display = "none";
  }


  const handleSubmit = (event) =>{
    event.preventDefault();
    if (input.password !== input.cPassword){
      setAlert(true)
    } else{
      dispatch(userRegisterAction(input))  
    }
  }

  const handleValidation = (event) => {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(event.target.value.match(lowerCaseLetters)) {  
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
    
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(event.target.value.match(upperCaseLetters)) {  
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
  
    // Validate numbers
    var numbers = /[0-9]/g;
    if(event.target.value.match(numbers)) {  
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
    
    // Validate length
    if(event.target.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }

  return (
    <div className='register--container'>
      {alert && <Alert message='Password does not match' handleClick={handleClick} />}
      {loading && <Spinner />}
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit} className='register'>
        <div className="register--heading"><i className="">Register</i></div>
        <div className="register--control name">
          <label htmlFor="name" className="name--label bold7"><i className="">full name:</i></label>
          <input type="text" name='name' id='name' 
            autoComplete='true' className="name--input input" placeholder='full name'
            onChange={handleInput} value = {input.name || ''} required
          />
        </div>
        <div className="register--control email">
          <label htmlFor="email" className="name--label bold7"><i className="">Email:</i></label>
          <input type="email" name='email' id='email' 
            autoComplete='true' className="email--input input" placeholder='Email'
            onChange={handleInput} value = {input.email || ''} required
          />
        </div>

        <div id="message" className="">
          <p>Password must contain the following:</p>
          <div className="validations">
            <p id="letter" className="invalid">A <b>lowercase</b> letter</p>
            <p id="capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
            <p id="number" className="invalid">A <b>number</b></p>
            <p id="length" className="invalid">Minimum <b>8 characters</b></p>
          </div>
        </div>

        <div className="register--control password">
          <label htmlFor="password" className="name--label bold7"><i className="">Password:</i></label>
          <input type="password" name='password' autoComplete='true' 
            id='password' className="password--input input" placeholder='Enter password' 
            onChange={handleInput} value = {input.password || ''}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
            required
            onFocus={handleFocus} onBlur={handleBlur} onKeyUp={handleValidation}
          />
        </div>
        <div className="register--control c-password">
          <label htmlFor="cPassword" className="name--label bold7"><i className="">Confirm Password:</i></label>
          <input type="password" name='cPassword' autoComplete='true' 
            id='cPassword' className="cPassword--input input" placeholder='Confirm password' 
            onChange={handleInput} value = {input.cPassword || ''} required
          />
        </div>
        <button className='register--submit btn1' type='submit'>
          <i className="">Register</i>
        </button>
      </form>

      <div className="register--login">
        <i className="">Already registered? </i>
        <Link className="rm-deco" to={'/login'}>
          <button className='btn'><i className="">login</i></button>
        </Link>
      </div>
    </div>
  )
}

export default RegisterScreen