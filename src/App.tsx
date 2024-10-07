/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import { TodoList } from './components/todoList';
import { TodoForm } from './components/todoForm';
import { Filter } from './components/filter';
import { Notification } from './components/notification';

enum FilterType {
  FILTERED_ACTIVE = 'Active',
  FILTERED_COMPLETED = 'Completed',
  CLEAR_COMPLETED = 'Clear completed',
  UNFILTERED = 'All',
}

export const App: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [titleInput, setTitleInput] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  const [hidden, setHidden] = useState(true);

  const [filterBy, setFilterBy] = useState(FilterType.UNFILTERED);

  const todoCount = todos.length;

  function clear(todoId: number) {
    todoService.deleteTodos(todoId).then(() => {
      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
    });
  }

  function getPreparedTodos(todoList: Todo[], filterType: string) {
    const preparedTodos = [...todoList];

    if (filterType === FilterType.UNFILTERED) {
      return preparedTodos;
    }

    if (filterType === FilterType.FILTERED_COMPLETED) {
      return preparedTodos.filter(todo => todo.completed);
    }

    if (filterType === FilterType.FILTERED_ACTIVE) {
      return preparedTodos.filter(todo => !todo.completed);
    } else {
      return null;
    }
  }

  const completedTasks = todos.filter(todo => todo.completed);

  const handleClearCompleted = (completed: Todo[]) => {
    setTodos(todos.filter(todo => !todo.completed));
    completed.map(todo => clear(todo.id));

    return todos;
  };

  const preparedTodos = getPreparedTodos(todos, filterBy);

  function loadTodos() {
    setLoading(true);
    setErrorMessage('');
    setIsSubmitting(true);
    setHidden(true);

    todoService
      .getTodos()
      .then(setTodos)
      .then(() => setIsSubmitting(false))
      .catch(() => setErrorMessage('Unable to load todos'))
      .then(() => setHidden(false))
      .then(() => {
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadTodos, []);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSubmitting]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleTitileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };

  // const reset = () => {
  //   setTitleInput('');
  // };

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();

  //   if (!titleInput) {
  //     setErrorMessage('Title should not be empty');
  //     setTimeout(() => {
  //       setErrorMessage('');
  //     }, 3000);

  //     return;
  //   }

  //   setIsSubmitting(true);

  //   addTodoToBase({
  //     id: 0,
  //     userId: 1441,
  //     title: titleInput,
  //     completed: false,
  //   })
  //     .then(reset)

  //     .finally(() => setIsSubmitting(false));
  // };

  const allTodosCompleted = todos.map(todo => todo.completed).includes(false);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <TodoForm
            todos={todos}
            loading={loading}
            allTodosCompleted={allTodosCompleted}
            // handleSubmit={handleSubmit}
            inputRef={inputRef}
            titleInput={titleInput}
            handleTitileChange={handleTitileChange}
            // isSubmitting={isSubmitting}
          />
        </header>

        <TodoList
          loading={loading}
          preparedTodos={preparedTodos}
          errorMessage={errorMessage}
          // isSubmitting={isSubmitting}
        />

        <Filter
          errorMessage={errorMessage}
          todos={todos}
          todoCount={todoCount}
          setFilterBy={setFilterBy}
          handleClearCompleted={handleClearCompleted}
          completedTasks={completedTasks}
        />
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <Notification
        message={errorMessage}
        hidden={hidden}
        onClose={() => {
          setErrorMessage('');
          setHidden(true);
        }}
      />
    </div>
  );
};
