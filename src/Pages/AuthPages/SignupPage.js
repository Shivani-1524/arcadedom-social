import React, { useState, useEffect } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { FormInput } from './FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../../Features/authSlice'
import { validateSignupForm } from '../../Utils/formValidators'


const SignupPage = () => {
    const dispatch = useDispatch()
    const { status, authError } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const initialSignupValues = {
        firstName: '', lastName: '', email: '', password: '',
    }
    const [signupData, setSignupData] = useState(initialSignupValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        name != "tncChk" ? setSignupData({ ...signupData, [name]: value }) : setSignupData({ ...signupData, [name]: e.target.checked })
    }

    const handleUserSignup = async (e) => {
        e.preventDefault();
        const errorObj = await validateSignupForm(signupData)
        setFormErrors(errorObj);
        setIsSubmit(true);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            (async () => {
                const res = await dispatch(signupUser(signupData))
                res?.payload?.encodedToken && navigate('/')
            })()
        }
    }, [formErrors, isSubmit])


    return (
        <div>
            <div className="auth-container">
                <div className="auth-card">
                    <p className="md-title center-txt">Sign Up</p>
                    <form onSubmit={handleUserSignup}>
                        <div className="input-flex-row mg-t-10">
                            <FormInput onChange={handleChange} formErrors={formErrors}
                                props={{ labelFor: 'firstName', labelTitle: 'First Name', placeholderText: 'Enter First Name', inputTypr: 'text' }} />
                            <FormInput onChange={handleChange}
                                props={{ labelFor: 'lastName', labelTitle: 'Last Name', placeholderText: 'Enter Last Name', inputType: 'text' }} />
                        </div>
                        <FormInput onChange={handleChange} formErrors={formErrors}
                            props={{ labelFor: 'email', labelTitle: 'Email', placeholderText: 'Enter email address', inputType: 'email' }} />

                        <FormInput onChange={handleChange} formErrors={formErrors}
                            props={{ labelFor: 'username', labelTitle: 'Username', placeholderText: 'Enter a Unique Username', inputType: 'text' }} />

                        <FormInput onChange={handleChange} formErrors={formErrors}
                            props={{ labelFor: 'password', labelTitle: 'Password', placeholderText: "6+ characters", inputType: 'password' }} />

                        <div className="flex-between">
                            <div className="flex-between mg-t-20">
                                <div className="check-container">
                                    <input name='tncChk' onChange={handleChange} type="checkbox" id="tncChk" htmlFor="tncChk" />
                                    <label htmlFor="tncChk">Accept T&C</label>
                                </div>
                            </div>
                            <Link to='/login'>
                                <p className='violet-txt bold mg-t-20'>
                                    Existing User? Login
                                </p>
                            </Link>
                        </div>
                        {formErrors && <p className="mg-t-10 orange-txt">{formErrors.tncChk}</p>}
                        {status === 'loading' ? <button type="button"
                            className="btn primary-btn solid mg-t-20">
                            Signing Up ...
                        </button> : <button type="submit"
                            className="btn primary-btn solid mg-t-20">
                            Sign Up
                        </button>}
                    </form>
                    {authError && <p className='orange-txt bold center-txt sm-txt mg-t-10'>{authError.toString().split(".")[0]}</p>}
                </div>
            </div>
        </div>
    )
}

export { SignupPage }