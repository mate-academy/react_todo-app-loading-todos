/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './helpers/userId';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoError } from './components/TodoError';
import { TodoFooter } from './components/TodoFooter';
import * as dataOperations from './api/todos';
import { Filter } from './types/Filter';

const filterTodos = (todos: Todo[], filter: Filter | ''): Todo[] => {
  switch (filter) {
    case Filter.all:
      return todos;
    case Filter.active:
      return todos.filter((todo) => !todo.completed);
    case Filter.completed:
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter | ''>('');

  useEffect(() => {
    dataOperations
      .getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filter);
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodo = ({ userId, title, completed }: Todo) => {
    setErrorMessage('');

    return dataOperations
      .addTodoToServer({ userId, title, completed })
      .then((newTodo) => {
        setTodos((currentTodos) => [...currentTodos, newTodo]);
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  };

  const deleteTodo = (todoId: number) => {
    setTodos((currentTodo) => currentTodo.filter((todo) => todo.id !== todoId));

    return dataOperations.deleteTodoOnServer(todoId).catch(() => {
      setTodos(todos);
      setErrorMessage('Unable to delete a todo');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    });
  };

  const onCheckedToggle = (todoId: number) => {
    setTodos((currentTodo) => {
      return currentTodo.map((todo) => {
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

  const handleFilter = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const count = todos.filter((todo) => todo.completed !== true).length;

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
            onSubmit={addTodo}
            onErrorMessage={setErrorMessage}
            onQuery={setQuery}
            query={query}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            onDelete={deleteTodo}
            onCheckedToggle={onCheckedToggle}
            todos={filteredTodos}
          />
        </section>

        {todos.length !== 0 && (
          <TodoFooter
            onTodoSelected={handleFilter}
            filter={filter}
            count={count}
          />
        )}
      </div>

      <TodoError onErrorMessage={setErrorMessage} errorMessage={errorMessage} />
    </div>
  );
};
