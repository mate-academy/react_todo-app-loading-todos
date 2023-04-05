/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames';
import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from 'react';
import { getUsers } from './api/users';
import { User } from './types/User';

export const Login: FC = () => {
  const [email, setEmail] = useState('');

  const [isLoading, setIsloading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    if (email) {
      event.preventDefault();
      setIsloading(true);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        getUsers()
          .then((users: any) => {
            const { id } = users.find((user: User) => user.email === email);

            localStorage.setItem('userId', id);
          })
          .then(() => window.location.reload());
      }, 300);
    }
  }, [isLoading]);

  return (
    <section className="login mt-5">
      <h1 className="login__title title is-3">Log in to open todos</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label
            htmlFor="emailInput"
            className="label"
          >
            Email
          </label>
          <p className="control has-icons-left">
            <input
              value={email}
              onChange={handleChange}
              id="emailInput"
              className="input"
              type="email"
              alt="emaillogin"
              placeholder="Enter your email"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          </p>
        </div>
        <div className="field control">
          <button
            type="submit"
            className={cn(
              'button',
              'is-primary',
              { 'is-loading': isLoading },
            )}
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};
