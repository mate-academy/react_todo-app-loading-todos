/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import * as todosApi from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([] as Todo[]);
  const [query, setQuery] = useState<string>('');
  const [leftItems, setLeftItems] = useState<number>(0);
  const [todoStatus, setTodoStatus] = useState<boolean>(false);
  const [edditingTodo, setEdditingTodo] = useState<number>();
  const [edditingTodoTitle, setEdditingTodoTitle] = useState<string>('');
  const [currentCreatedTodo, setCurrentCreatedTodo] = useState<string>('');
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    todosApi
      .getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setLeftItems(
          fetchedTodos.filter(todoToCount => !todoToCount.completed).length,
        );
      })
      .catch(() => {
        setError('Unable to load todos');
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
    setLeftItems(
      [...todos].filter(todoToCount => !todoToCount.completed).length,
    );
  }, [todos]);

  useEffect(() => {
    if (query === 'active') {
      setFilteredTodos(
        [...todos].filter(todoToFilter => !todoToFilter.completed),
      );
    } else if (query === 'completed') {
      setFilteredTodos(
        [...todos].filter(todoToFilter => todoToFilter.completed),
      );
    } else if (query === '') {
      setFilteredTodos(todos);
    }
  }, [query, todos]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [edditingTodo]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          currentCreatedTodo={currentCreatedTodo}
          setCurrentCreatedTodo={setCurrentCreatedTodo}
          setTodos={setTodos}
          setError={setError}
        />

        <TodoList
          filteredTodos={filteredTodos}
          setTodoStatus={setTodoStatus}
          setTodos={setTodos}
          inputRef={inputRef}
          edditingTodoTitle={edditingTodoTitle}
          setEdditingTodoTitle={setEdditingTodoTitle}
          edditingTodo={edditingTodo}
          setEdditingTodo={setEdditingTodo}
          setFilteredTodos={setFilteredTodos}
          todoStatus={todoStatus}
          setError={setError}
          todos={todos}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            leftItems={leftItems}
            query={query}
            setQuery={setQuery}
            todos={todos}
            setTodos={setTodos}
            setError={setError}
          />
        )}

        <Error error={error} setError={setError} />
      </div>
    </div>
  );
};
