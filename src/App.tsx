/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
// import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { USER_ID } from './utils/constants';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Errors } from './components/Errors';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [todosError, setTodosError] = useState('');
  const [filter, setFilter] = useState(FilterType.all);
  const [isShowErrors, setIsShowErrors] = useState<boolean>(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch((error) => {
        setTodosError(error.stack);
        setIsShowErrors(true);
      });
  }, []);

  const getFilteredTodos = (newFilter: FilterType) => {
    let todoCopy: Todo[] = [...todosFromServer];

    if (newFilter === FilterType.active) {
      todoCopy = todosFromServer.filter((todo) => !todo.completed);
    }

    if (newFilter === FilterType.completed) {
      todoCopy = todosFromServer.filter((todo) => todo.completed);
    }

    return todoCopy;
  };

  const onFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const todos = getFilteredTodos(filter);
  const errors = { todosError };
  // const isHiddenErrors = Object.values(errors).join("");

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todosFromServer={todosFromServer} />
        <TodoList todos={todos} />
        {(todos.length > 0 || filter !== FilterType.all)
        && (
          <Footer
            todos={todos}
            todosFromServer={todosFromServer}
            filter={filter}
            onFilterChange={onFilterChange}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Errors
        errors={errors}
        isShowErrors={isShowErrors}
        setIsShowErrors={setIsShowErrors}
      />
    </div>
  );
};
