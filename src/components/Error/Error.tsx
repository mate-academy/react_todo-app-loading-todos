import {
  FC, useContext, useEffect, useState,
} from 'react';
import classNames from 'classnames/bind';
import { AppTodoContext } from '../AppTodoContext/AppTodoContext';

export const Error: FC = () => {
  const { errorMessage } = useContext(AppTodoContext);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    setIsErrorVisible(true);

    setInterval(() => {
      setIsErrorVisible(false);
    }, 3000);
  }, [errorMessage]);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isErrorVisible },
      )}
    >
      <button
        aria-label="close button"
        value=""
        type="button"
        className="delete"
        onClick={() => {
          setIsErrorVisible(false);
        }}
      />

      {[errorMessage]}

    </div>
  );
};
