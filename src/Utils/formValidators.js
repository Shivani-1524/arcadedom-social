import { checkUserPresent } from './checkUserPresent'

export const validateSignupForm = async (values) => {
    const errors = {};
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    if (!values.firstName) {
        errors.firstName = "First Name is required"
    }
    if (!values.lastName) {
        errors.lastName = "Last Name is required"
    }
    if (!values.username) {
        errors.username = "Username is required"
    } else if (values.username.length > 0) {
        const userPresent = await checkUserPresent(values.username)
        if (userPresent) errors.username = "Username not available"
    }
    if (!values.email) {
        errors.email = "Email is required"
    } else if (!regex.test(values.email)) {
        errors.email = "Invalid Email Format"
    }
    if (!values.password) {
        errors.password = "Password is required"
    } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters"
    }
    if (!values.tncChk || values.tncChk === false) {
        errors.tncChk = "Please Accept the T&C to Proceed"
    }
    return errors;
}

export const validateLoginForm = (values) => {
    let errors = {}
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    if (!values.username) {
        errors.username = "Username is required"
    }
    if (!values.password) {
        errors.password = "Password is required"
    } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters"
    }
    return errors
}