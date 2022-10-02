/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components-Todo/ErrorNotification';
import { NewTodo } from './components-Todo/NewTodo';
import { TodoFillter } from './components-Todo/TodoFooter';
import { TodoList } from './components-Todo/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [statusPatch, setStatusPatch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
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
        case 'completed':

          return todo.completed;
        case 'active':

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
        <TodoFillter
          todos={todos}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <ErrorNotification
          hasLoadError={hasLoadError}
          setHasLoadError={setHasLoadError}
        />
      </div>
    </div>
  );
};
