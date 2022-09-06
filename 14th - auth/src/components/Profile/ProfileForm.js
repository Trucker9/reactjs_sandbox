import classes from './ProfileForm.module.css';
import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
    const newPassword = useRef();
    const authCtx = useContext(AuthContext);

    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredNewPassword = newPassword.current.value;
        // Validation here
        // ...
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDyv5g4w6QhxD-TvUuXjesci6Tmv_6Y9II', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    password: enteredNewPassword,
                    returnSecureToken: false
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res);
            if (res.ok) {
                const data = await res.json();
                console.log(data);
            } else {
                // error handling here
                throw new Error(res);
            }
        } catch (err) {
            console.error(err);
        }


    }


    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' minLength={7} ref={newPassword}/>
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
