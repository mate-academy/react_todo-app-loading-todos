import React, {
  useContext, useEffect, useRef, useState, useMemo,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Filter } from './components/Filter';

import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { getTodosByUserId } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(Filters.All);
  const [errorMessage, setErrorMessage] = useState('');

  const newTodoField = useRef<HTMLInputElement>(null);
  // console.log(newTodoField);

  const user = useContext(AuthContext);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodosByUserId(user.id)
        .then(loadedTodos => setTodos(loadedTodos))
        .catch(() => setErrorMessage('Cannot load todos'));
    }
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (selectedStatus) {
        case Filters.Active:
          return !todo.completed;

        case Filters.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, selectedStatus]);

  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <Filter
                activeTodos={activeTodos}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
