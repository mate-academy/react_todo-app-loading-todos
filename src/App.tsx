/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  KeyboardEvent, useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos, addTodo } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer';
import { TodosList } from './components/TodosList';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [filter, setFilter] = useState(Filter.all);
  const [onError, setOnError] = useState<string>('');
  const [isHidden, setIsHidden] = useState(true);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos);
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
        setOnError('add');
        setIsHidden(false);
      })
      .finally(() => {
        setTitle('');
        setTimeout(() => setIsHidden(true), 3000);
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
        onError={onError}
      />
    </div>
  );
};
