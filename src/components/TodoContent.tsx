import { FC, useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';
import { HeaderTodo } from './HeaderTodo/HeaderTodo';
import { MainTodo } from './MainTodo/MainTodo';
import { FooterTodo } from './FooterTodo/FooterTodo';
import { ErrorsTodo } from './Erorrs/ErrorsTodo';
import { getTodos } from '../api/todos';

export const TodoContent: FC = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [creating, setCreating] = useState(false);
  const timerId = useRef(0);

  const hasTodos = todos.length > 0;

  const showError = (message: string) => {
    window.clearTimeout(timerId.current);

    setErrorMessage(message);

    if (!message) {
      return;
    }

    timerId.current = window.setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    setCreating(true);
    getTodos()
      .then(todosData => {
        dispatch({ type: 'ADD_TODOS', payload: todosData });
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
      })
      .finally(() => {
        setCreating(false);
      });
  }, [dispatch]);

  return (
    <div className="todoapp__content">
      <HeaderTodo />
      {hasTodos && (
        <>
          <MainTodo creating={creating} />

          <FooterTodo />
        </>
      )}

      {errorMessage && (
        <ErrorsTodo errorMessage={errorMessage} showError={showError} />
      )}
    </div>
  );
};
