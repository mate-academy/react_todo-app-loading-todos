/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import TodoList from './components/TodoList';
import { Footer } from './components/Footer';
import { GlobalContext } from './context/GlobalContext';
import { FilterType } from './types/FilterTypes';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorEnum } from './types/ErrorEnum';

const USER_ID = 11325;

const filterTodos = (todos: Todo[], filterBy: FilterType) => {
  switch (filterBy) {
    case FilterType.ACTIVE:
      return todos.filter((todo) => !todo.completed);
    case FilterType.COMPLETED:
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const { todos, dispatch } = useContext(GlobalContext);
  const [status, setStatus] = useState(FilterType.ALL);
  const [errorMessage, setErrorMessage] = useState<ErrorEnum | null>(null);

  useEffect(() => {
    client
      .get<Todo[]>(`${11325}`)
      .then((res) => dispatch({ type: 'setTodos', todos: res }))
      .catch((err) => {
        setErrorMessage(ErrorEnum.UPDATE);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        throw new Error(err);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <TodoList todos={filterTodos(todos, status)} />

        {todos.length !== 0 && <Footer status={status} setStatus={setStatus} />}
      </div>
      {errorMessage && <ErrorNotification errorMessage={errorMessage} />}
    </div>
  );
};
