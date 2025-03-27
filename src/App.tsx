/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { ErrorMessage } from './types/ErrorMessage';

import * as todoApi from './api/todos';

import { UserWarning } from './UserWarning';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoList } from './components/TodoList';
import { TodoAppFooter } from './components/TodoAppFooter';
import { ErrorNotification } from './components/ErrorNotification';

function filterTodo(todos: Todo[], filterBy: FilterBy): Todo[] {
  switch (filterBy) {
    case FilterBy.Active:
      return todos.filter(todo => !todo.completed);
    case FilterBy.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return [...todos];
  }
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.NONE,
  );
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  const loadTodos = () => {
    setErrorMessage(ErrorMessage.NONE);
    setIsLoading(true);
    todoApi
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessage.TODO_LOAD))
      .finally(() => setIsLoading(false));
  };

  useEffect(loadTodos, []);

  const filteredTodos: Todo[] = filterTodo(todos, filterBy);

  if (!todoApi.USER_ID) {
    return <UserWarning />;
  }

  const addTodo = (newTodo: Todo) => {
    todoApi
      .addTodo(newTodo)
      .then(loadTodos)
      .catch(() => setErrorMessage(ErrorMessage.TODO_ADD));
  };

  const updateTodo = (updatedTodo: Todo) => {
    todoApi
      .updateTodo(updatedTodo)
      .then(loadTodos)
      .catch(() => setErrorMessage(ErrorMessage.TODO_UPDATE));
  };

  const deleteTodo = (todoId: number) => {
    todoApi
      .deleteTodo(todoId)
      .then(loadTodos)
      .catch(() => setErrorMessage(ErrorMessage.TODO_DELETE));
  };

  const toggleAll = () => {};

  const clearError = () => setErrorMessage(ErrorMessage.NONE);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader
          todos={filteredTodos}
          onAdd={addTodo}
          onToggleAll={toggleAll}
        />

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          todos.length > 0 && (
            <>
              <TodoList
                todos={filteredTodos}
                onTodoEdit={updateTodo}
                onTodoRemove={deleteTodo}
              />

              <TodoAppFooter
                todos={todos}
                currentFilter={filterBy}
                onfilterChange={setFilterBy}
              />
            </>
          )
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} clearError={clearError} />
    </div>
  );
};
