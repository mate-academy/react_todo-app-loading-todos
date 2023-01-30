/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';

import { AuthContext } from './components/Auth/AuthContext';
import { Filters } from './types/Filters';
import { Todo } from './types/Todo';
import { TodosHeader } from './components/TodosHeader';
import { TodosList } from './components/TodosList';
import { TodosFooter } from './components/TodosFooter';
import { ErrorMessage } from './components/ErrorMessage';
import { getVisibleTodos } from './tools/getVisibleTodos';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState(Filters.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setErrorMessage('Unable to load a todos'));
    }
  }, []);

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, filterOption);
  }, [todos, filterOption]);

  const activeTodos = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosHeader newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodosList todos={visibleTodos} />
            <TodosFooter
              activeTodos={activeTodos}
              filterOption={filterOption}
              onChangeFilterType={setFilterOption}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorMessage
          errorMessage={errorMessage}
          onChangeErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
