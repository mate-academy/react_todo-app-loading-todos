/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Filter } from './components/Filter/Filter';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { Notification } from './components/Notification/Notification';
import { Todo } from './types/Todo';

const USER_ID = 10596;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  const handleErrorMessage = (type: string) => {
    setErrorMessage(`Unable to ${type} a Todo`);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => handleErrorMessage('get'));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    switch (filterType) {
      case 'completed': {
        setCurrentTodos(todos.filter((todo) => todo.completed));
        break;
      }

      case 'active': {
        setCurrentTodos(todos.filter((todo) => !todo.completed));
        break;
      }

      default: {
        setCurrentTodos([...todos]);
      }
    }
  }, [todos, filterType]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <NewTodo />
        </header>

        <TodoList todos={currentTodos} />

        {todos.length && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${currentTodos.filter((todo) => !todo.completed).length} items left`}
            </span>

            <Filter currentFilter={filterType} onSelectFilter={setFilterType} />

            {todos.filter((todo) => todo.completed).length && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <Notification error={errorMessage} />
    </div>
  );
};
