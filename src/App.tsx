/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorsAlerts } from './components/ErrorsAlerts';
import { TodoAppHeader } from './components/TodoAppHeader/TodoAppHeader';
import { TodosFooter } from './components/TodosFooter';
import { TodosList } from './components/TodosList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterProp, setFilterProp] = useState<Filter>('All');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setErrorMessage('Can\'t load data');
        });
    }
  }, []);

  const filteredTodos = useMemo(() => (
    filterTodos(todos, filterProp)
  ), [todos, filterProp]);

  const activeTodosNum = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodosList todos={filteredTodos} />
            <TodosFooter
              activeTodosNum={activeTodosNum}
              filterProp={filterProp}
              changeFilterProp={setFilterProp}
            />
          </>
        )}
      </div>

      <ErrorsAlerts
        errorMessage={errorMessage}
        closeErrors={setErrorMessage}
      />
    </div>
  );
};
