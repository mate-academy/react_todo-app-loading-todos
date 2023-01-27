import {
  memo,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import autoAnimate from '@formkit/auto-animate';
import classNames from 'classnames';
import { TodosContext } from './TodosContext';

export const TodosError = memo(() => {
  const parentRef = useRef(null);
  const { errors, setErrors } = useContext(TodosContext);
  const { length } = errors;
  const getKey = useCallback((index: number) => `error_${index}`, []);

  const closeErrors = useCallback(() => {
    if (length) {
      setErrors([]);
    }
  }, [length, setErrors]);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, []);

  if (length) {
    setInterval(() => {
      closeErrors();
    }, 3000);
  }

  return (
    <div
      ref={parentRef}
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errors.length },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="hide errors"
        onClick={closeErrors}
      />

      {errors.map((error, i) => (
        <p
          key={getKey(i)}
        >
          {error}
        </p>
      ))}
    </div>
  );
});
