/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { ErorrMessage, FilterCondition } from './types/enums';
import { Header } from './components/Main/Header';
import { TodoList } from './components/Main/TodoList';
import { Footer } from './components/Main/Footer';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [filterCondition, setFilterCondition] = useState(FilterCondition.ALL);

  if (isError) {
    setTimeout(() => setIsError(false), 3000);
  }

  const getSelected = useCallback(
    (allTodos: Todo[]): Todo[] => {
      switch (filterCondition) {
        case FilterCondition.COMPLETED:
          return allTodos.filter(item => item.completed === true);

        case FilterCondition.ACTIVE:
          return allTodos.filter(item => item.completed === false);

        case FilterCondition.ALL:
        default: return allTodos;
      }
    }, [filterCondition],
  );

  const isTodoExist = todosList.length > 0
    || filterCondition !== FilterCondition.ALL;

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user?.id)
        .then(getSelected)
        .then(setTodosList)
        .catch(() => {
          setTodosList([]);
          setIsError(true);
          setErrorText(ErorrMessage.ON_UPLOAD);
        });
    }
  }, [filterCondition]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todosList={todosList}
          newTodoField={newTodoField}
          setIsError={setIsError}
        />
        <TodoList todosList={todosList} />

        {isTodoExist && (
          <Footer
            todosList={todosList}
            filterCondition={filterCondition}
            setFilterCondition={setFilterCondition}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification', 'is-danger', 'is-light', 'has-text-weight-normal',
          { hidden: !isError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsError(false)}
        />
        {errorText}
      </div>
    </div>
  );
};
