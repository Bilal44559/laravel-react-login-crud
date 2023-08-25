import { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import {useStateContext} from '../contexts/ContextProvider';
import axiosClient from '../../axios-client';

function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const {setUser,setToken} = useStateContext();
    const [errors,setErrors] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value,
            password_confirm : passwordConfirmRef.current.value,
        }

        // console.log(payload)
        axiosClient.post('/signup',payload)
        .then(( {data} )=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err=>{
            const response = err.response;
            if(response && response.status == 422){
                console.log(response.data.errors);
                setErrors(response.data.errors)
            }
        })
    }

  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className='form'>
            <form onSubmit={onSubmit}>
                <h1 className='title'>Create your account</h1>
                {
                    errors && <div className='alert'>
                        {Object.keys(errors).map( key => (
                            <p>{ errors[key] }</p>
                        ))}
                    </div>
                }
                <input ref={nameRef} type="text" placeholder='Fullname'/>
                <input ref={emailRef} type="email" placeholder='Email'/>
                <input ref={passwordRef} type="password" placeholder='Password'/>
                <input ref={passwordConfirmRef} type="password" placeholder='Confirm Password'/>
                <button className='btn btn-block'>Signup</button>
                <p className='message'>
                    Already Registered? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Signup
