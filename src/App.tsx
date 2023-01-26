/* eslint-disable jsx-a11y/control-has-associated-label */
// eslint-disable-next-line object-curly-newline
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getTodos, createTodo } from './api/todos';
import { Todo } from './types/Todo';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { filterTotos } from './api/filter';
import { Filter } from './types/Filter';
import { Error } from './types/Error';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [typeFilter, setTypeFilter] = useState(Filter.all);
  const [error, setError] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then((loadedTodos) => setTodos(loadedTodos))
        .catch(() => {
          setError(Error.loading);
          setIsHidden(false);
          setTimeout(() => {
            setIsHidden(true);
          }, 3000);
        });
    }
  }, []);

  const handleAddToto = (titleTodo: string) => {
    if (!user) {
      return;
    }

    const todo: Todo = {
      title: titleTodo,
      userId: user?.id,
      completed: false,
      id: user?.id,
    };

    createTodo(todo)
      .then((loadedTodos) => setTodos(loadedTodos))
      .catch(() => {
        setError(Error.add);
        setIsHidden(false);
        setTimeout(() => {
          setIsHidden(true);
        }, 3000);
      })
      .finally(() => setTitle(''));
  };

  const visibleTodos = filterTotos(todos, typeFilter);
  const itemsLeftCount = filterTotos(todos, Filter.active).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          title={title}
          setTitle={setTitle}
          handleAddToto={handleAddToto}
        />
        <TodoList todos={visibleTodos} />
        {!!todos.length && (
          <Footer
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            itemsLeftCount={itemsLeftCount}
          />
        )}
      </div>
      <ErrorNotification
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        error={error}
      />
    </div>
  );
};
