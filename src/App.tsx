/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { NewTodos } from './components/NewTodos';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { getTodos } from './api/todos';
import { getFilterTodos } from './components/helpers/helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [
    filterType,
    setFilterType,
  ] = useState<FilterType>(FilterType.All);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          showErrorMessage('Can\'t load todos!');
        });
    }
  }, []);

  const incompleteTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  const amountOfCompletedTodos = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const filterTodos = useMemo(() => {
    return getFilterTodos(todos, filterType);
  }, [todos, filterType]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <NewTodos newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filterTodos} />

            <Footer
              incompleteTodos={incompleteTodos}
              amountOfCompletedTodos={amountOfCompletedTodos}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </>
        )}
      </div>

      {errorMessage}
    </div>
  );
};
