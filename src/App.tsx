/* eslint-disable jsx-a11y/control-has-associated-label */
// eslint-disable-next-line object-curly-newline
import React, { useEffect, useRef, useState } from 'react';
import { getTodos, createTodo } from './api/todos';
import { filterTotos } from './api/filter';
import { useAuthContext } from './components/Auth/useAuthContext';
// eslint-disable-next-line object-curly-newline
import { ErrorNotification, Header, TodoList, Footer } from './components';
import { Todo, FilterTypes, ErrorTypes } from './types';

export const App: React.FC = () => {
  const user = useAuthContext();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [typeFilter, setTypeFilter] = useState(FilterTypes.All);
  const [error, setError] = useState('');
  const [isHiddenErrorNote, setIsHiddenErrorNote] = useState(true);

  const newTodoField = useRef<HTMLInputElement | null>(null);

  function hiddenErrorNote() {
    setIsHiddenErrorNote(false);
    setTimeout(() => {
      setIsHiddenErrorNote(true);
    }, 3000);
  }

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then((res) => setTodos(res))
        .catch(() => {
          setError(ErrorTypes.Loading);
          hiddenErrorNote();
        });
    }
  }, []);

  const addTodoHandler = (titleTodo: string) => {
    if (!user) {
      return;
    }

    const todo = {
      title: titleTodo,
      userId: user?.id,
      completed: false,
    };

    createTodo(todo)
      .then((res) => setTodos((prevTodos) => [...prevTodos, res]))
      .catch(() => {
        setError(ErrorTypes.Add);
        hiddenErrorNote();
      })
      .finally(() => setTitle(''));
  };

  const visibleTodos = filterTotos(todos, typeFilter);
  const completedTodosCount = filterTotos(todos, FilterTypes.Active).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          ref={newTodoField}
          title={title}
          setTitle={setTitle}
          onAddToto={addTodoHandler}
        />
        <TodoList todos={visibleTodos} />
        {!!todos.length && (
          <Footer
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            completedTodosCount={completedTodosCount}
          />
        )}
      </div>
      <ErrorNotification
        isHidden={isHiddenErrorNote}
        setIsHidden={setIsHiddenErrorNote}
        error={error}
      />
    </div>
  );
};
