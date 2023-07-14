/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { Notification } from './components/Notification/Notification';
import { Todo } from './types/Todo';
import { FilterTypes } from './types/FilterTypes';
import { Footer } from './components/Footer/Footer';

const USER_ID = 10596;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterTypes>(FilterTypes.ALL);
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
        setCurrentTodos(todos);
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
          <Footer
            allTodos={todos}
            currentTodos={currentTodos}
            currentFilter={filterType}
            onSelectFilter={setFilterType}
          />
        )}
      </div>

      <Notification error={errorMessage} />
    </div>
  );
};
