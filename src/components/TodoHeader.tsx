import { useContext, useRef } from 'react';
import { CreatedContext } from './TodoContext';
import classNames from 'classnames';
import React from 'react';
import { USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';
import { addTodo } from '../api/todos';

export const TodoHeader = () => {
  const { state, dispatch } = useContext(CreatedContext);

  const { todos, newTitle, focusedTodo } = state;

  const handleSubmit: React.FormEventHandler = async event => {
    event.preventDefault();

    if (!newTitle.trim()) {
      dispatch({
        type: 'CHANGE_ERROR_STATUS',
        error: { type: 'EmptyTitleError' },
      });

      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      userId: USER_ID,
      title: newTitle,
      completed: false,
      editted: false,
    };

    try {
      await addTodo(newTodo);
      dispatch({
        type: 'ADD_TODO',
        addTodo: newTodo,
      });
    } catch (error) {
      dispatch({
        type: 'CHANGE_ERROR_STATUS',
        error: { type: 'NoAddingTodoError' },
      });
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  if (focusedTodo) {
    inputRef.current?.focus();
  } else {
    inputRef.current?.blur();
  }

  const onlyCompletedTodos = todos.filter(todo => todo.completed);

  const allTodosAreCompleted = onlyCompletedTodos.length === todos.length;

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosAreCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            dispatch({
              type: 'CHECK_ALL_COMPLETED',
              checked: allTodosAreCompleted,
            });
          }}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: 'CHANGE_TODO',
              changedTitle: event.target.value.toString(),
            })
          }
          onClick={() => {
            dispatch({
              type: 'FOCUS_TODO',
            });
          }}
          onBlur={() => {
            dispatch({
              type: 'FOCUS_TODO',
            });
          }}
        />
      </form>
    </header>
  );
};

TodoHeader.displayName = 'ToDoHeader';
