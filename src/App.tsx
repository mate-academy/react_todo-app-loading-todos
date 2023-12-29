/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { Header } from './components/Heder/Heder';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterTodos } from './enum/FilterTodos';
import { TodoError } from './enum/TodoError/TodoError';

const USER_ID = 12111;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [chooseFilter, setChooseFilter] = useState<string>(FilterTodos.All);
  const [errorMessage, setErrorMesage] = useState<string | null>('');

  useEffect(() => {
    getTodos(USER_ID).then(setTodos)
      .catch(() => setErrorMesage(TodoError.UnableLoad));
  }, []);

  const filterTodos = useMemo(() => todos.filter((todo: Todo) => {
    switch (chooseFilter) {
      case FilterTodos.Active:
        return !todo.completed;

      case FilterTodos.Completed:
        return todo.completed;

      default:
        return todo;
    }
  }), [chooseFilter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          setErrorMesage={setErrorMesage}
        />
        {todos.length !== 0 && (
          <TodoList
            todos={filterTodos}
          />
        )}
        {todos.length !== 0 && (
          <Footer
            setChooseFilter={setChooseFilter}
            todos={filterTodos}
            chooseFilter={chooseFilter}
          />
        )}

      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMesage={setErrorMesage}
        />
      )}
    </div>
  );
};
