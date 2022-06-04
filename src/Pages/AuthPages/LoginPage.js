import React, { useState, useEffect } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { FormInput } from './FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Features/authSlice'
import { validateLoginForm } from '../../Utils/formValidators'

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status, authError } = useSelector(state => state.auth)

    const initialLoginValues = {
        username: '', password: '',
    }

    const [loginData, setLoginData] = useState(initialLoginValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    }

    const handleUserLogin = async (e) => {
        e.preventDefault()
        const errorObj = validateLoginForm(loginData)
        setFormErrors(errorObj);
        setIsSubmit(true);
    }

    const handleGuestLogin = (e) => {
        e.preventDefault()
        setLoginData({
            username: "pickledrick",
            password: "tester",
        })
        setFormErrors({});
        setIsSubmit(true);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            (async () => {
                const res = await dispatch(loginUser(loginData))
                res?.payload?.encodedToken && navigate('/')
            })()
        }
    }, [formErrors, isSubmit])


    return (
        <div>
            <div className="auth-container">
                <div className="auth-card">
                    <p className="md-title center-txt">Sign In</p>
                    <form>
                        <FormInput onChange={handleChange} formErrors={formErrors}
                            props={{ labelFor: 'username', labelTitle: 'Username', value: loginData.username, placeholderText: 'Enter a Unique Username', inputType: 'text' }} />
                        <FormInput onChange={handleChange} formErrors={formErrors}
                            props={{ labelFor: 'password', value: loginData.password, labelTitle: 'Password', placeholderText: "Enter test", inputType: 'password' }} />
                        {/* feature to be implemented forgotpswd */}
                        {/* <div className="flex-between mg-t-20">
                            <p className="orange-txt pointer">Forgot Your Password?</p>
                        </div> */}
                        {status === "loading" ?
                            <button type="button" className="btn primary-btn solid mg-t-10">
                                Signing In...
                            </button> : <div>
                                <button type="submit" onClick={handleGuestLogin} className="btn primary-btn solid mg-t-30">
                                    Sign In as a Guest
                                </button>
                                <button type="submit" onClick={handleUserLogin} className="btn primary-btn solid mg-t-10">
                                    Sign In
                                </button>
                            </div>}
                    </form>
                    <Link to="/signup">
                        <button className="btn warning-outlined-btn mg-t-10 btn-darkbg">
                            New User? Sign Up
                        </button>
                    </Link>
                </div>
                {authError && <p className='orange-txt bold sm-txt mg-t-20'>{authError.toString().split(".")[0]}</p>}
            </div>
        </div>
    )
}

export { LoginPage }