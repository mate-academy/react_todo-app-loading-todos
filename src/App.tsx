/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodos,
  postTodos,
  patchTodo,
  deleteTodo,
} from './api/todos';
import Notifications from './components/Notifications';
import { Todo } from './types/Todo';
import { Filter } from './components/Filter';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { TodoButtons } from './components/TodoButtons';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>(
    FilterStatus.All,
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errorMessage, setErrorMessage] = useState('');

  const focusedInput = useRef<HTMLInputElement>(null);

  const allFilters = useMemo(() => {
    return {
      [FilterStatus.All]: () => true,
      [FilterStatus.Active]: (td: Todo) => !td.completed,
      [FilterStatus.Completed]: (td: Todo) => td.completed,
    };
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setErrorMessage('');
    focusedInput.current?.focus();

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const filteredTodos = todos.filter(allFilters[currentFilter]);
  const incompletedTodos = todos.filter(td => !td.completed);

  const handleAddTodo = (title: string) => {
    const newTodo: Omit<Todo, 'id'> = {
      title,
      completed: false,
      userId: USER_ID,
    };

    postTodos(newTodo)
      .then(todo => setTodos(prev => [...prev, todo]))
      .catch(() => {
        setErrorMessage('Unable to add a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  const handleToggleTodo = (id: number) => {
    const todo = todos.find(td => td.id === id);

    if (!todo) {
      return;
    }

    patchTodo(id, { completed: !todo.completed })
      .then(updated =>
        setTodos(prev =>
          prev.map(td => (td.id === id ? { ...td, ...updated } : td)),
        ),
      )
      .catch(() => {
        setErrorMessage('Unable to update a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id)
      .then(() => setTodos(prev => prev.filter(td => td.id !== id)))
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  const handleClearCompleted = () => {
    const completed = todos.filter(td => td.completed);

    Promise.all(completed.map(td => deleteTodo(td.id)))
      .then(() => setTodos(prev => prev.filter(td => !td.completed)))
      .catch(() => {
        setErrorMessage('Unable to clear completed todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  const handleCloseError = () => setErrorMessage('');

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && <TodoButtons todos={todos} />}
          <NewTodo focusedInput={focusedInput} onAddTodo={handleAddTodo} />
        </header>

        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {incompletedTodos.length} items left
            </span>

            <Filter
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.length - incompletedTodos.length === 0}
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <Notifications message={errorMessage} onClose={handleCloseError} />
    </div>
  );
};
