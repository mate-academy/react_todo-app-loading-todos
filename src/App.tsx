/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  addTodo,
  changeTodo,
  deleteTodo,
  getTodos,
  USER_ID,
} from './api/todos';
import { AddForm } from './components/AddForm/AddForm';
import { ErrComponent } from './components/ErrComponent/ErrComponent';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo, Todo, TodoId } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loadingTodoId, setLoadingTodoId] = useState<TodoId | null>(null);
  const [editingId, setEditingId] = useState<TodoId | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      if (!USER_ID) {
        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const onSubmitTodo = async (title: string): Promise<boolean> => {
    if (isLoading) {
      return false;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const newTodo: NewTodo = {
        title,
        completed: false,
        userId: USER_ID,
      };

      const createdTodo = await addTodo(newTodo);

      setTodos(currentTodos => [createdTodo, ...currentTodos]);

      return true;
    } catch (error) {
      setErrorMessage('Unable to add a todo');

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteTodo = async (todoId: TodoId): Promise<boolean> => {
    if (loadingTodoId === todoId) {
      return false;
    }

    setLoadingTodoId(todoId);
    setErrorMessage('');

    const previousTodos = [...todos];

    try {
      setTodos(current => current.filter(t => t.id !== todoId));
      await deleteTodo(todoId);

      return true;
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
      setTodos(previousTodos);

      return false;
    } finally {
      setLoadingTodoId(null);
    }
  };

  const onChangeTodo = async (newTodo: Todo): Promise<boolean> => {
    setLoadingTodoId(newTodo.id);
    setErrorMessage('');

    const previousTodos = [...todos];

    try {
      setTodos(currentTodos =>
        currentTodos.map(todo => (todo.id === newTodo.id ? newTodo : todo)),
      );
      await changeTodo(newTodo);

      return true;
    } catch (err) {
      setErrorMessage('Unable to update a todo');
      setTodos(previousTodos);

      return false;
    } finally {
      setLoadingTodoId(null);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <AddForm
            onSubmit={onSubmitTodo}
            onError={setErrorMessage}
            disabled={isLoading}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            todos={todos}
            onDelete={onDeleteTodo}
            onChange={onChangeTodo}
            loadingTodoId={loadingTodoId}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              3 items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      {/* {Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo} */}
      <ErrComponent
        errMessage={errorMessage}
        onClose={setErrorMessage}
        duration={1000}
      />
    </div>
  );
};
