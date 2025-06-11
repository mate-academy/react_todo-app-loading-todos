/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import * as TodosService from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filter';
import { getVisibleTodos } from './utils/getVisibleTodos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');

  function showTemporaryError(message: string) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  useEffect(() => {
    setErrorMessage('');
    TodosService.getTodos()
      .then(setTodos)
      .catch(() => showTemporaryError('Unable to load todos'));
  }, []);

  const visibleTodos = getVisibleTodos(todos, filter);
  const isAllTodosCompleted = todos.every(todo => todo.completed);

  function addTodo(newTodo: Todo) {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  function deleteTodo(todoId: number) {
    TodosService.deleteTodo();
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  }

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    if (title) {
      addTodo({
        title,
        id: 0,
        userId: 0,
        completed: false,
      });
    } else {
      showTemporaryError('Title should not be empty');
    }

    setTitle('');
  };

  if (!TodosService.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          title={title}
          onTitleChange={handleTitle}
          onSubmit={handleSubmit}
          isAllTodosCompleted={isAllTodosCompleted}
        />

        <TodoList todos={visibleTodos} onTodoDelete={deleteTodo} />

        {!!todos.length && (
          <Footer
            todos={todos}
            filter={filter}
            onFilterChange={setFilter}
            isAllTodosCompleted={isAllTodosCompleted}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        onErrorClose={setErrorMessage}
      />
    </div>
  );
};
