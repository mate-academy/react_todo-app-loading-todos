/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6397;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentError, setCurrentError] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<number[]>([]);

  const getTodosFromServer = async (uri: string) => {
    try {
      setCurrentError('');

      const data = await getTodos(uri);

      setVisibleTodos(data);
      setTodos(data);
      setCompletedTodos(data
        .filter(todo => todo.completed)
        .map(filteredTodo => filteredTodo.id));
    } catch (error) {
      if (error instanceof Error) {
        setCurrentError(error.message);
      }
    }
  };

  useEffect(() => {
    getTodosFromServer(`?userId=${USER_ID}`);
  }, []);

  const removeError = () => {
    setCurrentError('');
  };

  const filterTodos = (type: Filter) => {
    switch (type) {
      case Filter.All:
        setVisibleTodos(todos);
        break;
      case Filter.Active:
        setVisibleTodos(todos.filter((todo => !todo.completed)));
        break;
      case Filter.Completed:
        setVisibleTodos(todos.filter((todo => todo.completed)));
        break;
      default:
        setVisibleTodos(todos);
    }
  };

  const addCompletedTodos = (todoId: number) => {
    const currentTodo = todos.find(todo => todo.id === todoId);

    if (currentTodo) {
      if (!completedTodos.includes(todoId)) {
        setCompletedTodos((CurrentCompletedTodos) => {
          return [
            ...CurrentCompletedTodos,
            todoId,
          ];
        });
      } else {
        setCompletedTodos((CurrentCompletedTodos) => {
          return CurrentCompletedTodos.filter(todo => todo !== todoId);
        });
      }
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        {!(todos.length === 0) && (
          <>
            <TodoList
              todos={visibleTodos}
              addCompletedTodos={addCompletedTodos}
            />
            <Footer
              filterTodos={filterTodos}
              todosCount={todos.length}
              completedTodosCount={completedTodos.length}
            />
          </>
        )}
      </div>
      {currentError && (
        <ErrorNotification
          error={currentError}
          removeError={removeError}
        />
      )}
    </div>
  );
};
