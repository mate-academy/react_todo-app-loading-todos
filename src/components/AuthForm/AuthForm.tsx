import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import { createUser, getUserByEmail } from '../../api/users';

import { ActionTypes } from '../../types/ActionTypes';
import { User } from '../../types/User';
import { DispatchContext } from '../../providers/StateContext';

export const AuthForm: React.FC = () => {
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needToRegister, setNeedToRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = (user: User) => {
    dispatch({
      type: ActionTypes.SET_USER,
      user,
    });
  };

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    try {
      const user = JSON.parse(userData) as User;

      onLogin(user);
    } catch (error) {
      // Need to login
    }
  }, []);

  const loadUser = async () => {
    const user = await getUserByEmail(email);

    if (user) {
      saveUser(user);
    } else {
      setNeedToRegister(true);
    }
  };

  const registerUser = () => {
    return createUser({ name, email })
      .then(saveUser);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrorMessage('');
    setLoading(true);

    try {
      if (needToRegister) {
        await registerUser();
      } else {
        await loadUser();
      }
    } catch (error) {
      setErrorMessage('Something went wrtong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="box mt-5">
      <h1 className="title is-3">
        {needToRegister ? 'You need to register' : 'Log in to open todos'}
      </h1>

      <div className="field">
        <label className="label" htmlFor="user-email">
          Email
        </label>

        <div
          className={classNames('control has-icons-left', {
            'is-loading': loading,
          })}
        >
          <input
            type="email"
            id="user-email"
            className={classNames('input', {
              'is-danger': !needToRegister && errorMessage,
            })}
            placeholder="Enter your email"
            disabled={loading || needToRegister}
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>

        {!needToRegister && errorMessage && (
          <p className="help is-danger">{errorMessage}</p>
        )}
      </div>

      {needToRegister && (
        <div className="field">
          <label className="label" htmlFor="user-name">
            Your Name
          </label>

          <div
            className={classNames('control has-icons-left', {
              'is-loading': loading,
            })}
          >
            <input
              type="text"
              id="user-name"
              className={classNames('input', {
                'is-danger': needToRegister && errorMessage,
              })}
              placeholder="Enter your name"
              required
              minLength={4}
              disabled={loading}
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
          </div>

          {needToRegister && errorMessage && (
            <p className="help is-danger">{errorMessage}</p>
          )}
        </div>
      )}

      <div className="field">
        <button
          type="submit"
          className={classNames('button is-primary', {
            'is-loading': loading,
          })}
        >
          {needToRegister ? 'Register' : 'Login'}
        </button>
      </div>
    </form>
  );
};
