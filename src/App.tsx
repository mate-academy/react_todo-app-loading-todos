import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';

import { Todo } from './types/Todo';

import { getTodos } from './api/todos';

import { Header } from './components/ErrorMessage/Header/Header';
import { TodoList } from './components/ErrorMessage/TodoList/TodoList';
import { Footer } from './components/ErrorMessage/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

const USER_ID = 12018;

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => setTodoList(response))
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  const [activeTodos, completedTodos] = useMemo(() => {
    let active = 0;
    let completed = 0;

    if (todoList) {
      active = todoList.filter(todo => !todo.completed).length;
      completed = todoList.filter(todo => todo.completed).length;
    }

    return [active, completed];
  }, [todoList]);

  const todoListToShow: Todo[] | null = useMemo(() => {
    if (todoList) {
      switch (filter) {
        case 'completed':
          return todoList.filter(todo => !todo.completed);

        case 'active':
          return todoList.filter(todo => todo.completed);

        default:
          return todoList;
      }
    }

    return null;
  }, [todoList, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          activeTodos={activeTodos}
        />

        {todoListToShow && (
          <TodoList
            todoList={todoListToShow}
          />
        )}

        {todoList && (
          <Footer
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            filter={filter}
            setFilter={(newFilter: string) => setFilter(newFilter)}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        clearErrorMessage={() => setErrorMessage('')}
      />
    </div>
  );
};

/*
  error hint for rest lessons
  Title should not be empty
  Unable to add a todo
  Unable to delete a todo
  Unable to update a todo
*/
