/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';

import { UserWarning } from './UserWarning';

import { Todo } from './types/Todo';
import { SelectedCategory } from './types/SelectedCategory';
import { ErrorMessage } from './types/ErrorMessage';

import * as todoService from './api/todos';

import { USER_ID } from './utils/constants';

import { ToggleAll } from './component/ToggleAll';
import { TodoInList } from './component/TodoInList';
import { NewTodo } from './component/NewTodo';
import { Filter } from './component/Filter';
import { ClearCompleted } from './component/ClearCompleted';
import { ErrorNotification } from './component/ErrorNotification';

function filter(todos: Todo[], category: SelectedCategory) {
  switch (category) {
    case SelectedCategory.Active:
      return [...todos].filter(todo => !todo.completed);

    case SelectedCategory.Completed:
      return [...todos].filter(todo => todo.completed);

    default:
      return [...todos];
  }
}

const showError = (
  message: ErrorMessage,
  set: (error: ErrorMessage | null) => void,
) => {
  set(message);

  setTimeout(() => {
    set(null);
  }, 3000);
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [category, setCategory] = useState<SelectedCategory>(SelectedCategory.All);
  const [error, setError] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    todoService
      .getTodos(USER_ID)
      .then(setTodos)
      .catch(() => showError(ErrorMessage.Load, setError));
  }, []);

  const filteredTodos = useMemo(() => {
    return filter(todos, category);
  }, [todos, category]);

  const ActiveTodosCounter = useMemo(() => {
    return todos.reduce((prev, todo) => {
      if (!todo.completed) {
        return prev + 1;
      }

      return prev;
    }, 0);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <ToggleAll
            activeTodos={ActiveTodosCounter}
          />

          <NewTodo />
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              {filteredTodos.map(todo => (
                <TodoInList
                  key={todo.id}
                  todo={todo}
                />
              ))}
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${ActiveTodosCounter} items left`}
              </span>

              <Filter
                category={category}
                onClick={setCategory}
              />

              <ClearCompleted
                todos={todos}
                countActiveTodos={ActiveTodosCounter}
              />
            </footer>
          </>
        )}
      </div>

      {error && (
        <ErrorNotification
          error={error}
          setError={() => setError(null)}
        />
      )}
    </div>
  );
};
