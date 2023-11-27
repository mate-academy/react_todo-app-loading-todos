/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './helpers/userId';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoError } from './components/TodoError';
import { TodoFooter } from './components/TodoFooter';
import * as dataOperations from './api/todos';
import { SelectedTodo } from './types/SelectedTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTodoSelected, setIsTodoSelected] = useState('');

  useEffect(() => {
    dataOperations.getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        throw error;
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodos = ({ userId, title, completed }: Todo) => {
    setErrorMessage('');

    return dataOperations.addTodos({ userId, title, completed })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
      })
      .catch((error) => {
        setErrorMessage('Unable to add a todo');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        throw error;
      });
  };

  const deleteTodos = (todoId: number) => {
    setTodos(currentTodo => currentTodo.filter(todo => todo.id !== todoId));

    return dataOperations.deleteTodos(todoId)
      .catch((error) => {
        setTodos(todos);
        setErrorMessage('Unable to delete a todo');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        throw error;
      });
  };

  const onCheckedToggle = (todoId: number) => {
    setTodos(currentTodo => {
      return currentTodo.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });
    });
  };

  let copyOfTodos = [...todos];

  switch (isTodoSelected) {
    case SelectedTodo.all:
      copyOfTodos = todos.filter(todo => todo);
      break;
    case SelectedTodo.active:
      copyOfTodos = todos.filter(todo => !todo.completed);
      break;
    case SelectedTodo.completed:
      copyOfTodos = todos.filter(todo => todo.completed);
      break;
    default: copyOfTodos = todos;
  }

  const count = todos.filter(todo => todo.completed !== true).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length !== 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          <TodoForm
            onSubmit={addTodos}
            onErrorMessage={setErrorMessage}
            onQuery={setQuery}
            query={query}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            onDelete={deleteTodos}
            onCheckedToggle={onCheckedToggle}
            todos={copyOfTodos}
          />
        </section>

        {todos.length !== 0 && (
          <TodoFooter
            onTodoSelected={setIsTodoSelected}
            isTodoSelected={isTodoSelected}
            count={count}
          />
        )}
      </div>

      <TodoError
        onErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
};
