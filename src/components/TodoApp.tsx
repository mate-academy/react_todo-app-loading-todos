import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Todolist } from './TodoList';
import { Footer } from './Footer';
import { Error } from './Error';
import { Todo } from '../types/Todo';
import { UserWarning } from '../UserWarning';
import { ErrorType } from '../types/ErrorType';
import { FilterType } from '../types/FilterType';
import { getTodos } from '../api/todos';

const USER_ID = 11973;

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterType.ALL);
  const [errorMassage, setErrorMassage] = useState(ErrorType.NO_ERROR);

  function loadTodos() {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMassage(ErrorType.LOAD_ERROR))
      .finally(() => {
        setTimeout(() => setErrorMassage(ErrorType.NO_ERROR), 3000);
      });
  }

  useEffect(loadTodos, []);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'Active':
        return todo.completed === false;

      case 'Completed':
        return todo.completed === true;

      case 'All':
      default:
        return todos;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length !== 0 && (
          <>
            <Todolist todos={visibleTodos} setTodos={setTodos} />
            <Footer
              filter={filter}
              setFilter={setFilter}
              todos={todos}
              setTodos={setTodos}
            />
          </>
        )}
      </div>

      <Error errorMassage={errorMassage} setError={setErrorMassage} />
    </div>
  );
};
