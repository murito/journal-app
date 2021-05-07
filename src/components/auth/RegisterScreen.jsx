import React from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { setError , removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [formVavlues, handleInputChange] = useForm({
        name: 'Hernan',
        email: 'fran@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formVavlues;

    const handleRegister = (e) => {
        e.preventDefault();

        if( isFormValid() ){
            //console.log("Form is ok.");
            dispatch( startRegisterWithEmailPasswordName( email, password, name) );
        }
    }

    const isFormValid = () => {
        if( name.trim().length === 0 ){
            dispatch( setError('Name is required') );

            return false;
        }else if( !validator.isEmail( email ) ) {
            dispatch( setError('Email is required and should be valid.') );

            return false;
        }else if ( password !== password2 || password.length < 5 ){
            dispatch( setError('Password should be at least 5 chars and should be match password2.') );

            return false;
        }

        dispatch( removeError() );

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <hr className="mt-5 mb-5"/>
            <form onSubmit={ handleRegister }>
                { msgError &&  <div className="auth__alert-error">{ msgError }</div> }
                
                <input type="text" 
                    placeholder="Name" 
                    className={`auth__input`}
                    autoComplete="password"
                    name="name" 
                    onChange={ handleInputChange }
                    value={ name }/>

                <input type="text" 
                    placeholder="Email" 
                    className="auth__input"
                    autoComplete="off"
                    name="email" 
                    onChange={ handleInputChange }
                    value={ email }/>
            
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="auth__input"
                    autoComplete="off"
                    name="password" 
                    onChange={ handleInputChange }
                    value={ password }/>

                <input 
                    type="password" 
                    placeholder="Password Confirm" 
                    className="auth__input"
                    autoComplete="off"
                    name="password2" 
                    onChange={ handleInputChange }
                    value={ password2 }/>
            
                <button type="submit" className="btn-submit pointer">Register</button>

                <Link
                    className="link pointer mt-5"
                    to="/auth/login">
                        Already registered?
                </Link>
            </form>
        </>
    )
}
