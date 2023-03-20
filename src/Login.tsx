import { ChangeEvent, FC, useState } from 'react';

export const Login: FC = () => {
  const [email, setEmail] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem('email', email);
  };

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
        <div className="field">
          <input
            type="submit"
            value="Login"
            className="button is-primary"
          />
        </div>
      </form>
    </section>
  );
};
