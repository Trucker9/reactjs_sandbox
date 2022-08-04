import { useDispatch } from 'react-redux';

import { authAction } from '../store/auth-slice';
import classes from './Auth.module.css';

const Auth = () => {

const dispatch = useDispatch();


  const loginHandler = (e) => {
    e.preventDefault();
    // authAction.login() returns an action and then dispatch sends it to the store to execute the login reducer method
    dispatch(authAction.login());
  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
