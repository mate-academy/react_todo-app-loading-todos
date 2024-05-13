import { FC, useContext, useEffect, useRef, useState } from 'react';
import { TodoContext, TodoDispatch } from '../Context/TodoContext';
import { HeaderTodo } from './HeaderTodo/HeaderTodo';
import { MainTodo } from './MainTodo/MainTodo';
import { FooterTodo } from './FooterTodo/FooterTodo';
import { ErrorsTodo } from './Erorrs/ErrorsTodo';
import { getTodos } from '../api/todos';

export const TodoContent: FC = () => {
  const { todos } = useContext(TodoContext);
  const dispatch = useContext(TodoDispatch);
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
    showError('');
    getTodos()
      .then(todosData => {
        dispatch({ type: 'ADD_TODOS', payload: todosData });
      })
      .catch(() => {
        showError('Unable to load todos');
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

      <ErrorsTodo errorMessage={errorMessage} showError={showError} />
    </div>
  );
};
