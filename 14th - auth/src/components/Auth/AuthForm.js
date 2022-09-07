import {useState, useRef, useContext} from 'react';

import classes from './AuthForm.module.css';
import AuthContext from "../../store/auth-context";
import {useHistory} from "react-router-dom";

const firebaseSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyv5g4w6QhxD-TvUuXjesci6Tmv_6Y9II';
const firebaseSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyv5g4w6QhxD-TvUuXjesci6Tmv_6Y9II'
const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const authCtx = useContext(AuthContext);

    const emailRef = useRef();
    const passwordRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        // optional: Add validation
        setIsLoading(true);
        let url;
        isLogin ? url = firebaseSignIn : url = firebaseSignUp;

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setIsLoading(false);

            if (res.ok) {
                const data = await res.json();

                const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
                authCtx.login(data.idToken, expirationTime.toISOString());
                history.replace('/');
                console.log(data);
            } else {
                const data = await res.json();
                let errorMessage = 'Authentication failed!';
                console.log(data);
                throw new Error(errorMessage);
            }

        } catch (err) {
            // show error to user
            console.log(err);
        }

    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordRef}/>
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>Loading Spinner ........</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
