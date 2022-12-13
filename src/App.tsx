/* eslint-disable jsx-a11y/control-has-associated-label */
import React,
{
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import {
  ErrorNotification,
} from './components/ErrorNotifications/ErrorNotifications';
import { TodosFooter } from './components/TodosComponents/TodosFooter';
import { TodosHeader } from './components/TodosComponents/TodosHeader';
import { TodosList } from './components/TodosComponents/TodosList';
import { FilterValues } from './types/FilterValues';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState<FilterValues>(FilterValues.ALL);
  const [errorStatus, setErrorStatus] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>();

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const getErrorStatus = (currentError: string) => {
    setErrorMessage(currentError);

    setErrorStatus(true);

    const handleId = setTimeout(() => {
      setErrorStatus(false);

      setErrorMessage('');
    }, 3000);

    setTimerId(handleId);

    if (timerId) {
      clearTimeout(timerId);
    }
  };

  const onErrorStatus = (errStatus: boolean) => {
    setErrorStatus(errStatus);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => getErrorStatus('cannot access to server, pls try again'));
    }
  }, []);

  const onFilterByCompleted = (todoStatus: FilterValues) => {
    setTodoFilter(todoStatus);
  };

  let visibleTodos = [...todos];

  if (todoFilter !== FilterValues.ALL) {
    visibleTodos = visibleTodos
      .filter(completedTodo => {
        switch (todoFilter) {
          case (FilterValues.ACTIVE):
            return completedTodo.completed === true;

          case (FilterValues.COMPLETED):
            return completedTodo.completed === false;

          default:
            return 0;
        }
      });
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosHeader
          newTodoField={newTodoField}
          getErrorStatus={getErrorStatus}
        />

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              <TodosList todos={visibleTodos} />
            </section>

            <TodosFooter
              todos={visibleTodos}
              onFilterByCompleted={onFilterByCompleted}
              todoFilter={todoFilter}
            />
          </>
        )}
      </div>

      {errorStatus && timerId && (
        <ErrorNotification
          timerId={timerId}
          ErrorMessage={ErrorMessage}
          onErrorStatus={onErrorStatus}
        />
      )}
    </div>
  );
};
