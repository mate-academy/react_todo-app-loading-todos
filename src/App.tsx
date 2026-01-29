/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import Todos from './components/Todos/Todos';
import cn from 'classnames';
import TodoHeader from './components/TodoHeader/TodoHeader';
import TodoFooter from './components/TodoFooter/TodoFooter';
import { FilterStatus } from './types/enums';

enum ErrorMessage {
  None = '',
  LoadTodos = 'Unable to load todos',
  EmptyTitle = 'Title should not be empty',
  AddTodo = 'Unable to add a todo',
  DeleteTodo = 'Unable to delete a todo',
  UpdateTodo = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [errorMsg, setErrorMsg] = useState<ErrorMessage>(ErrorMessage.None);

  const errorMsgTimeOutId = useRef<number>(0);

  const handleErrorMessage = (msgType: ErrorMessage) => {
    setErrorMsg(msgType);

    clearTimeout(errorMsgTimeOutId.current);
    errorMsgTimeOutId.current = window.setTimeout(() => {
      setErrorMsg(() => ErrorMessage.None);
    }, 3000);
  };

  const handleTodoToggle = useCallback(
    (todoId: number) => {
      setTodos(
        todos.map(todo => {
          if (todo.id === todoId) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      );
    },
    [todos],
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        handleErrorMessage(ErrorMessage.LoadTodos);
      });
  }, []);

  const handleFilterChange = (filter: FilterStatus) => {
    setFilterStatus(filter);
  };

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return todos.filter(todo => !todo.completed);

      case FilterStatus.Completed:
        return todos.filter(todo => todo.completed);

      case FilterStatus.All:
      default:
        return todos;
    }
  }, [todos, filterStatus]);

  const undoneTodosCount = useMemo(
    () => todos.reduce((acc, todo) => (todo.completed ? acc : acc + 1), 0),
    [todos],
  );

  const isAllTodosCompleted = undoneTodosCount === 0;
  const isAllTodosUncompleted = undoneTodosCount === todos.length;

  const handleToggleAll = () => {
    if (isAllTodosCompleted) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));
    } else {
      setTodos(todos.map(todo => ({ ...todo, completed: true })));
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={todos}
          isAllTodosCompleted={isAllTodosCompleted}
          onToggleAll={handleToggleAll}
        />

        <Todos todos={visibleTodos} handleTodoToggle={handleTodoToggle} />

        {todos.length > 0 && (
          <TodoFooter
            undoneTodosCount={undoneTodosCount}
            isAllTodosUncompleted={isAllTodosUncompleted}
            filterStatus={filterStatus}
            onFilterChange={handleFilterChange}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMsg },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => handleErrorMessage(ErrorMessage.None)}
        />
        {errorMsg}
      </div>
    </div>
  );
};
