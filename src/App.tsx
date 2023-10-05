/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  addTodo, deleteTodo, getTodos, updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Error } from './components/Error';

const USER_ID = 11616;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [errorWarning, setErrorWarning] = useState('');

  const handleErrorSet = (errMessage: string) => {
    setErrorWarning(errMessage);
    setTimeout(() => {
      setErrorWarning('');
    }, 3000);
  };

  const closeError = () => {
    setErrorWarning('');
  };

  const loadTodos = async () => {
    closeError();
    try {
      const loadedTodos = await getTodos(USER_ID);

      setTodos(loadedTodos);
    } catch (error) {
      handleErrorSet('load-todo');
      throw error;
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = (filterBy: string) => {
    if (todos) {
      switch (filterBy) {
        case 'all':
          return todos;
        case 'active':
          return todos.filter(todo => (
            !todo.completed
          ));
        case 'completed':
          return todos.filter(todo => (
            todo.completed
          ));
        default: return todos;
      }
    }

    return todos;
  };

  const handleFormSubmit = async () => {
    if (query.trim().length < 1) {
      handleErrorSet('title-empty');

      return;
    }

    const newTodo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      userId: USER_ID,
      title: query,
      completed: false,
    };

    try {
      await addTodo('/todos', newTodo);
    } catch (error) {
      handleErrorSet('add-todo');
      throw error;
    }

    await loadTodos();
    setQuery('');
  };

  const handleComplete = async (id: number, completed: boolean) => {
    closeError();
    try {
      await updateTodo(id, { completed: !completed });
    } catch (error) {
      handleErrorSet('update-todo');
      throw error;
    }

    await loadTodos();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      handleErrorSet('delete-todo');
      throw error;
    }

    await loadTodos();
  };

  const completedTodos = useCallback(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  const uncompletedTodos = useCallback(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todosLength={todos.length}
          handleFormSubmit={handleFormSubmit}
          query={query}
          setQuery={setQuery}
          uncompletedTodos={uncompletedTodos()}
        />
        {todos && (
          <TodoList
            todos={visibleTodos(filter)}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            filter={setFilter}
            filterValue={filter}
            completedTodos={completedTodos()}
            uncompletedTodos={uncompletedTodos()}
          />
        )}
      </div>
      <Error error={errorWarning} closeError={closeError} />
    </div>
  );
};
