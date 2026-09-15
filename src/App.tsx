/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
/* eslint-disable-next-line max-len */
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(todos => {
        setAllTodos(todos);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    switch (filter) {
      case 'all':
        return allTodos;
      case 'completed':
        return allTodos.filter(todo => todo.completed);
      case 'active':
        return allTodos.filter(todo => !todo.completed);
    }
  }, [filter, allTodos]);

  const activeCount = useMemo(() => {
    return allTodos.reduce(
      (accCount, todo) => (todo.completed ? accCount : accCount + 1),
      0,
    );
  }, [allTodos]);

  const addNewTodo = useCallback(
    (title: string) => {
      const newTodo: Todo = {
        id: Math.max(...allTodos.map(todo => todo.id)) + 1,
        title,
        userId: allTodos[0].userId,
        completed: false,
      };

      setAllTodos(prevList => [...prevList, newTodo]);
    },
    [allTodos],
  );

  const deleteTodo = useCallback((todo: Todo) => {
    setAllTodos(prevList => {
      const newList = [...prevList];

      newList.splice(prevList.indexOf(todo), 1);

      return newList;
    });
  }, []);

  const toggleAllComplete = useCallback((allCompleted: boolean) => {
    setAllTodos(prevList => [
      ...prevList.map(todo => ({ ...todo, completed: !allCompleted })),
    ]);
  }, []);

  const toggleOneComplete = useCallback((todo: Todo) => {
    setAllTodos(prevList => {
      const newList = [...prevList];

      newList.splice(prevList.indexOf(todo), 1, {
        ...todo,
        ...{ completed: !todo.completed },
      });

      return newList;
    });
  }, []);

  const setError = useCallback((error: string) => {
    setErrorMessage(error);
    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isAllCompleted={activeCount === 0}
          onAdd={addNewTodo}
          onError={setErrorMessage}
          onComplete={toggleAllComplete}
        />
        <TodoList
          todos={filteredTodos}
          toggleComplete={toggleOneComplete}
          onDelete={deleteTodo}
        />

        {/* Hide the footer if there are no todos */}
        {allTodos.length && (
          <Footer
            onFilter={setFilter}
            currentFilter={filter}
            activeCount={activeCount}
            doesCompletedExist={activeCount < allTodos.length}
            setTodos={setAllTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification errorMessage={errorMessage} onError={setError} />
    </div>
  );
};
