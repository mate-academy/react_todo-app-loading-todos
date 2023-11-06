/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Filter } from './types/Filter';
import { ErrorMessage } from './components/ErrorMessage';

const USER_ID = '11827';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShowError, setIsShowError] = useState(false);
  // const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    client
      .get(`/todos?userId=${USER_ID}`)
      .then((allTodos) => setTodos(allTodos as Todo[]))
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsShowError(true);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filterBy) {
      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return Filter.All;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              // selectedTodoId={selectedTodo?.id ?? 0}
              // onTodoSelected={setSelectedTodo}
            />

            <TodoFilter
              todos={todos}
              filterBy={filterBy}
              onFilterClick={setFilterBy}
            />
          </>
        )}
      </div>
      <ErrorMessage
        errorMessage={errorMessage}
        isShowError={isShowError}
        setIsShowError={setIsShowError}
      />
    </div>
  );
};
