/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { createTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { TodoAppHeader } from './components/TodoAppHeader';

const USER_ID = 11206;

const prepearedTodos = (
  todos: Todo[],
  filterType: string,
) => {
  const todosCopy = [...todos].filter(todo => {
    switch (filterType) {
      case 'all':
        return todos;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return 0;
    }
  });

  return todosCopy;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const todoList = prepearedTodos(todos, filterType);

  useEffect(() => {
    getTodos(USER_ID).then(setTodos);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodo = (
    event: React.FormEvent,
  ) => {
    if (newTitle.trim().length === 0) {
      setHasTitleError(true);

      setTimeout(() => {
        setHasTitleError(false);
      }, 3000);

      return;
    }

    event.preventDefault();

    createTodo({ title: newTitle, completed: false, userId: USER_ID })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
      })
      .catch((error) => {
        setHasTitleError(true);
        setTimeout(() => {
          setHasTitleError(false);
        }, 3000);
        throw error;
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader
          todos={todos}
          addTodo={addTodo}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
        />

        <TodoList todos={todoList} />

        {todos.length ? (
          <TodoFooter
            todos={todos}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        ) : null}
      </div>

      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !hasTitleError,
          },
        )}
      >
        <button type="button" className="delete" />

        {newTitle.trim().length === 0 && (
          'Title can`t be empty'
        )}

        {newTitle.trim().length !== 0 && (
          'Unable to add a todo'
        )}
        <br />
      </div>
    </div>
  );
};
