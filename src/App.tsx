/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { SelectedStatus, Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(SelectedStatus.all);

  const filterSelectedTodos = (status: SelectedStatus) => {
    if (status === SelectedStatus.active) {
      return todos.filter(todo => !todo.completed) || [];
    }

    if (status === SelectedStatus.completed) {
      return todos.filter(todo => todo.completed) || [];
    }

    return todos;
  };

  const handleSetStatus = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    switch (target.textContent) {
      case SelectedStatus.all:
        setSelectedStatus(SelectedStatus.all);
        setSelectedTodos(filterSelectedTodos(SelectedStatus.all));
        break;
      case SelectedStatus.active:
        setSelectedStatus(SelectedStatus.active);
        setSelectedTodos(filterSelectedTodos(SelectedStatus.active));
        break;
      case SelectedStatus.completed:
        setSelectedStatus(SelectedStatus.completed);
        setSelectedTodos(filterSelectedTodos(SelectedStatus.completed));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getTodos()
      .then(todoData => {
        setTodos(todoData);
        setSelectedTodos(todoData);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const handleChangeTodo = (todoId: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
    setSelectedTodos(filterSelectedTodos(selectedStatus));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList
          selectedTodos={selectedTodos}
          onCheckTodo={handleChangeTodo}
        />

        <Footer
          todos={todos}
          selectedStatus={selectedStatus}
          setStatus={handleSetStatus}
        />
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

<>
  {/* This is a completed todo */}
  <div data-cy="Todo" className="todo completed">
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      Completed Todo
    </span>

    {/* Remove button appears only on hover */}
    <button type="button" className="todo__remove" data-cy="TodoDelete">
      ×
    </button>

    {/* overlay will cover the todo while it is being deleted or updated */}
    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>

  {/* This todo is an active todo */}
  <div data-cy="Todo" className="todo">
    <label className="todo__status-label">
      <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      Not Completed Todo
    </span>
    <button type="button" className="todo__remove" data-cy="TodoDelete">
      ×
    </button>

    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>

  {/* This todo is being edited */}
  <div data-cy="Todo" className="todo">
    <label className="todo__status-label">
      <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
    </label>

    {/* This form is shown instead of the title and remove button */}
    <form>
      <input
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value="Todo is being edited now"
      />
    </form>

    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>

  {/* This todo is in loadind state */}
  <div data-cy="Todo" className="todo">
    <label className="todo__status-label">
      <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      Todo is being saved now
    </span>

    <button type="button" className="todo__remove" data-cy="TodoDelete">
      ×
    </button>

    {/* 'is-active' class puts this modal on top of the todo */}
    <div data-cy="TodoLoader" className="modal overlay is-active">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
</>;
