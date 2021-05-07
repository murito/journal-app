import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );

    const [formVavlues, handleInputChange] = useForm({
        email: 'fran@gmail.com',
        password: '123456'
    });

    const { email, password } = formVavlues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword(email, password) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <>
            <h3 className="auth__title">
                <i className="fas fa-lock mr-5"></i>
                <span>Login</span>
            </h3>
            <hr className="mt-5 mb-5"/>
            <form onSubmit={ handleLogin }>
                <input type="text" 
                    placeholder="Email" 
                    className="auth__input"
                    autoComplete="off"
                    name="email"
                    onChange={ handleInputChange }
                    value={ email } />
            
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="auth__input"
                    autoComplete="off"
                    name="password" 
                    onChange={ handleInputChange }
                    value={ password }/>
            
                <button type="submit" 
                    className="btn-submit pointer"
                    disabled={ loading }>Login</button>
                

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <hr className="mt-5 mb-5"/>
                    <div className="google-btn" onClick={ handleGoogleLogin }>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    className="link pointer"
                    to="/auth/register">
                        Create new account
                </Link>
            </form>
        </>
    )
}
