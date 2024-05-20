import React, { useEffect, useState } from 'react';
import * as todosService from './api/todos';
import { Todo } from './types/Todo';
import { NewTodoForm } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import classNames from 'classnames';
import {
  getCompletedTodosLength,
  getfilteredTodos,
} from './utils/getFilterTodos';
import { FILTERS } from './types/FILTERS';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FILTERS.all);
  const [errorMessage, setErrorMessage] = useState('');

  function showErrorMessage(error: string) {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  useEffect(() => {
    if (todosService.USER_ID) {
      todosService
        .getTodos()
        .then(setTodos)
        .catch(() => showErrorMessage('Unable to load todos'));
    }
  }, []);

  function addTodos({ userId, completed, title }: Omit<Todo, 'id'>) {
    return todosService
      .createTodos({ userId, completed, title })
      .then(newTodos => {
        setTodos(currentTodos => {
          return [...currentTodos, newTodos];
        });
      })
      .catch(() => {
        showErrorMessage('Unable to add a todo');
      });
  }

  function deleteTodo(todoId: number) {
    return todosService
      .deleteTodos(todoId)
      .then(() =>
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        ),
      )
      .catch(() => {
        showErrorMessage('Unable to delete a todo');
      });
  }

  const visibleTodos = getfilteredTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: getCompletedTodosLength(todos) === todos.length,
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <NewTodoForm
            onSubmit={addTodos}
            userId={todosService.USER_ID}
            onError={showErrorMessage}
          />
        </header>
        {todos.length > 0 && (
          <TodoList todos={visibleTodos} onDelete={deleteTodo} />
        )}

        {todos.length > 0 && (
          <Footer filter={filter} onFilter={setFilter} todos={todos} />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onError={setErrorMessage}
      />
    </div>
  );
};
