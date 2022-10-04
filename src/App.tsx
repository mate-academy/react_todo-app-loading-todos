/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components_Todo/ErrorNotification';
import { NewTodo } from './components_Todo/NewTodo';
import { TodoFilter } from './components_Todo/TodoFilter';
import { TodoList } from './components_Todo/TodoList';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusPatch, setStatusPatch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
      setHasLoadError(false);
      if (user) {
        getTodos(user.id)
          .then(response => {
            setTodos(response);
          }).catch(() => (
            setHasLoadError(true)
          ));
      }
    }
  }, []);

  const filterTodos = todos
    ? todos.filter(todo => {
      switch (statusFilter) {
        case FilterStatus.Completed:

          return todo.completed;
        case FilterStatus.Active:

          return !todo.completed;

        default:
          return todo;
      }
    })
    : null;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo newTodoField={newTodoField} />
        <TodoList
          todos={filterTodos}
          statusPatch={statusPatch}
          setStatusPatch={setStatusPatch}
        />
        {todos.length !== 0 && (
          <TodoFilter
            todos={todos}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}
        {hasLoadError && (
          <ErrorNotification
            hasLoadError={hasLoadError}
            setHasLoadError={setHasLoadError}
          />
        )}
      </div>
    </div>
  );
};
