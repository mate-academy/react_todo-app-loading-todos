import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma';
import { LogingSteps } from '../../types/enum';
import { UserData } from '../../types/userData';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userNamePattern = /^[A-Za-zА-Яа-яЁёЙйІіЇїЄєҐґ\s_-]{3,}$/;

type Props = {
  step: LogingSteps;
  setStep: (arg: LogingSteps) => void;
  setUser: (arg: UserData) => void;
};

export const Authorization: React.FC<Props> = ({
  step,
  setStep,
  setUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [mailUnvalid, setMailUnvalid] = useState(false);
  const [userNameIsValid, setNameUnvalid] = useState(false);
  const [userMail, setUserMail] = useState('');
  const [userName, setUserName] = useState('');

  const userMailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMail(e.target.value);
  };

  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const userNameBlur = () => {
    if (userNamePattern.test(userName)) {
      setNameUnvalid(true);
    } else {
      setNameUnvalid(false);
    }
  };

  const getUserData = () => {
    setLoading(true);
    fetch(`https://mate.academy/students-api/users?email=${userMail}`)
      .then((userData) => userData.json())
      .then((userObj) => {
        setUser(userObj[0]);
        setStep(LogingSteps.NAME);
        setUserName(userObj[0].name);
        setLoading(false);
      })
      .catch((fail) => new Error(fail.message));
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === LogingSteps.EMAIL) {
      return !emailPattern.test(userMail)
        ? setMailUnvalid(true)
        : getUserData();
    }

    if (userNamePattern.test(userName)) {
      setStep(LogingSteps.COMPLETE);
    } else {
      return setNameUnvalid(true);
    }

    return false;
  };

  const skipHandler = () => {
    setLoading(true);
    fetch('https://mate.academy/students-api/users?email=gookidoo@gmail.com')
      .then((userData) => userData.json())
      .then((userObj) => {
        setUser(userObj[0]);
        setStep(LogingSteps.COMPLETE);
        setLoading(false);
      })
      .catch((fail) => new Error(fail.message));
  };

  return (
    <section
      className="section is-flex m-4
        is-flex-direction-column is-align-items-center"
    >
      <form className="form box m-auto" method="GET" onSubmit={formHandler}>
        <div className="field">
          <h1 className="form__title title h1">Get your userId</h1>

          {step !== LogingSteps.NAME && (
            <div className="field">
              <label className="label" htmlFor="userMailID">
                Email
              </label>
              <div className="control has-icons-left has-icons-right">
                <input
                  required
                  id="userMailID"
                  className={cn('input', { 'is-danger': mailUnvalid })}
                  type="email"
                  placeholder="Email input"
                  value={userMail}
                  onChange={userMailHandler}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
                {mailUnvalid && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                )}
              </div>
              {mailUnvalid && (
                <p className="help is-danger">This email is invalid</p>
              )}
            </div>
          )}

          {step === LogingSteps.NAME && (
            <div className="field">
              <label className="label" htmlFor="userNameID">
                Username
              </label>
              <div className="control has-icons-left has-icons-right">
                <input
                  required
                  disabled
                  id="userNameID"
                  className={cn('input', {
                    'input is-success': userNameIsValid,
                  })}
                  type="text"
                  placeholder="Text input"
                  value={userName}
                  onChange={userNameHandler}
                  onBlur={userNameBlur}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
                {userNameIsValid && (
                  <span className="icon is-small is-right has-text-success">
                    <i className="fas fa-check" />
                  </span>
                )}
              </div>
              {userNameIsValid && (
                <p className="help is-success">This username is available</p>
              )}
            </div>
          )}

          <div className="field is-grouped">
            <div className="control">
              <button
                className={cn('button is-primary', { 'is-loading': loading })}
                type="submit"
              >
                Login
              </button>

              <button
                className="button is-light ml-2"
                type="submit"
                onClick={skipHandler}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </form>

      <p
        className="has-text-danger-dark spanwarn mt-3 has-text-centered"
        style={{ width: '70%' }}
      >
        *Вибачте, спочатку реалізував,
        а вже потім побачив, що це зовсім не обов`язково було (((
        введіть свою пошту або просто натисніть на Skip
      </p>
    </section>
  );
};
