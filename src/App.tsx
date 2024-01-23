/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos, updateTodoStatus } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { Errors } from './utils/Errors';
import { Footer } from './utils/Footer';
import { Query } from './utils/Query';
import { TodoList } from './utils/TodoList';

const USER_ID = 12157;

export enum FilterStatus {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filt, setFilt] = useState(FilterStatus.All);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((todo) => {
        // setLoading(true);
        setTodos(todo);
      })
      .catch((errorToThrow) => {
        handleError('Unable to load todos');
        throw errorToThrow;
      })
      // .finally(() => setLoading(false));
  }, []);

  const updateChecked = (todo: Todo) => {
    updateTodoStatus(todo.id, todo.completed)
    // .then(newTodo => {
    //   setLoading(true);
    //     setTodos((currentTodos) => {
    //       const newTodos = [...currentTodos];

    //       const found = newTodos.find((item) => item.id === newTodo.id);
    //       const newItem = { ...found, completed: !found?.completed};
    //       const index = newTodos.findIndex(el => el.id === found?.id);

    //       newTodos.splice(index, 1, newItem);

      //       return newTodos;
      //     });
      // })
      .catch((fetchError) => {
        handleError('Unable to update a todo');
        throw fetchError;
      })
      // .finally(() => setLoading(false));
  };

  const filteredTodos = todos.filter((todo: { completed: boolean; }) => {
    switch (filt) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Query
          query={query}
          setQuery={setQuery}
          handleError={handleError}
          filteredTodos={filteredTodos}
        />

        <TodoList
          filteredTodos={filteredTodos}
          handleError={handleError}
          updateChecked={updateChecked}
        />

        {todos.length > 0
        && (
          <Footer
            todos={todos}
            setError={setError}
            filt={filt}
            setFilt={setFilt}
          />
        )}
      </div>

      <Errors
        error={error}
        setError={setError}
      />
    </div>
  );
};
