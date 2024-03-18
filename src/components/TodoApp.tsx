import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TodosContext } from './TodosContext';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { USER_ID } from '../api/todos';
import classNames from 'classnames';

export const TodoApp: React.FC = () => {
  const context = useContext(TodosContext);
  const { todos, toggleAll, addTodo, handleDeleteCompleted } = context;
  const [title, setTitle] = useState('');
  const titleField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  const todosUncompleteLength = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);
  const todosCompletedAtLeastOne = useMemo(() => {
    return todos.some(todo => todo.completed === true);
  }, [todos]);

  const todosCompletedAll = useMemo(() => {
    return todos.every(todo => todo.completed === true);
  }, [todos]);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length !== 0) {
      addTodo({
        id: +new Date(),
        title,
        completed: false,
        userId: USER_ID,
      });
      setTitle('');
    }
  };

  return (
    <>
      <header className="todoapp__header">
        {todos.length > 0 && (
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todosCompletedAll,
            })}
            data-cy="ToggleAllButton"
            onClick={toggleAll}
          />
        )}

        <form onSubmit={handleSubmit} onBlur={handleSubmit}>
          <input
            ref={titleField}
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitle}
          />
        </form>
      </header>

      <TodoList />

      {/* Hide the footer if there are no todos */}
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todosUncompleteLength} items left
          </span>

          <TodosFilter />

          {todosCompletedAtLeastOne && (
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleDeleteCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
