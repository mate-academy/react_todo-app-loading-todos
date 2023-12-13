import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';

import { Todo } from './types/Todo';

import { getTodos } from './api/todos';

import { Header } from './components/ErrorMessage/Header/Header';
import { TodoList } from './components/ErrorMessage/TodoList/TodoList';
import { Footer } from './components/ErrorMessage/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { TodoListState } from './types/TodoListState';
import { Errors } from './types/Errors';

const USER_ID = 12018;

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<TodoListState>(TodoListState.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodoList)
      .catch(() => setErrorMessage(Errors.Load));
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
    switch (filter) {
      case TodoListState.Completed:
        return todoList.filter(todo => !todo.completed);

      case TodoListState.Active:
        return todoList.filter(todo => todo.completed);

      default:
        return todoList;
    }
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
            setFilter={setFilter}
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
