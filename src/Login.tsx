import cn from 'classnames';
import {
  ChangeEvent, FC, useEffect, useState,
} from 'react';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('email', email);

      if (isLoading === true) {
        window.location.reload();
      }
    }, 300);

    return () => clearTimeout(timer);
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
