/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodosList';
import * as todosApi from './api/todos';
import { Header } from './components/TodoHeader';
import { Hidden } from './components/TodoHidden';
import { TodoFooter } from './components/TodoFooter';
import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilter';

const USER_ID = 11890;

export const App: React.FC = () => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodosFilter>(TodosFilter.all);
  const [newTodo, setNewTodo] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await todosApi.getTodos();

        setCurrentTodos(todos);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Unable to load todos');
      }
    };

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          setCurrentTodos={setCurrentTodos}
        />
        <TodoList
          currentTodos={currentTodos}
          filter={filter}
        />

        {/* Hide the footer if there are no todos */}
        {currentTodos && (
          <TodoFooter
            currentTodos={currentTodos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Hidden errorMessage={errorMessage} />
    </div>
  );
};
