/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  KeyboardEvent, useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos, addTodo } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { AuthContext } from './components/Auth';
import {
  Footer,
  TodosList,
  ErrorNotification,
  Header,
} from './components';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [filter, setFilter] = useState(Filter.all);
  const [error, setError] = useState<ErrorType | null>(null);
  const [isHidden, setIsHidden] = useState(true);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setError(ErrorType.load);
          setIsHidden(false);
          setTimeout(() => setIsHidden(true), 3000);
        });
    }
  }, []);

  const handleEnterPress = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' || !user) {
      return;
    }

    const todo = {
      title,
      userId: user.id,
      completed: false,
    };

    addTodo(todo)
      .then(result => setTodos(
        prevTodos => [...prevTodos, result],
      ))
      .catch(() => {
        setError(ErrorType.add);
        setIsHidden(false);
        setTimeout(() => setIsHidden(true), 3000);
      })
      .finally(() => {
        setTitle('');
      });
  };

  const handleFilter = (arr: Todo[], filterType: string) => {
    switch (filterType) {
      case Filter.active:
        return arr.filter(element => !element.completed);

      case Filter.completed:
        return arr.filter(element => element.completed);

      default:
        return arr;
    }
  };

  const visibleTodos = handleFilter(todos, filter);
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          title={title}
          setTitle={setTitle}
          handleEnterPress={handleEnterPress}
          setIsHidden={setIsHidden}
        />

        {todos.length > 0 && (
          <>
            <TodosList todos={visibleTodos} />

            <Footer
              filter={filter}
              setFilter={setFilter}
              activeCount={activeCount}
            />
          </>
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
