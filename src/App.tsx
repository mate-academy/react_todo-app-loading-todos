/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext, useEffect, useRef, useState, FC,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const visibleTodos = todos;
  const onSetFilter = (value : FilterType) => setFilter(value);

  if (filter !== FilterType.ALL) {
    visibleTodos.filter(todo => {
      switch (filter) {
        case FilterType.ACTIVE:
          return !todo.completed;

        case FilterType.COMPLETED:
          return todo.completed;

        default:
          return true;
      }
    });
  }

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setError('Something went wrong...');
        });
    }

    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
        />
        {!visibleTodos.length && (
          <>
            <TodoList
              todos={visibleTodos}
            />
            <Footer
              todos={todos}
              filter={filter}
              setFilter={onSetFilter}
            />
          </>
        )}

      </div>
      <ErrorNotification error={error} />
    </div>
  );
};
