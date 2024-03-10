import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterOptions } from '../types/FilterOptions';
import { getFilteredTodos } from '../utils/getFilteredTodos';

type Props = {
  todos: Todo[];
  updateTodos: (todoItems: Todo[]) => void;
  filterOption: FilterOptions;
};

export const TodoList: React.FC<Props> = ({
  todos,
  updateTodos,
  filterOption,
}) => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoQuery, setEditingTodoQuery] = useState<string>('');

  const editingTodoField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingTodoField.current && editingTodoId) {
      editingTodoField.current.focus();
    }
  }, [editingTodoId]);

  const visibleTodos = getFilteredTodos(todos, filterOption);

  const handleCheckboxChange = (todoId: number, completed: boolean): void => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todoItem => todoItem.id === todoId);

    newTodos[index].completed = !completed;

    updateTodos(newTodos);
  };

  const handleDeleteTodoById = (todoId: number): void => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todoItem => todoItem.id === todoId);

    newTodos.splice(index, 1);

    updateTodos(newTodos);
  };

  const handleRenameTodo = (todoId: number, newTodoTitle: string): void => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todoItem => todoItem.id === todoId);

    newTodos[index].title = newTodoTitle;

    updateTodos(newTodos);
  };

  const startEditTodo = (todoId: number, todoTitle: string): void => {
    setEditingTodoId(todoId);
    setEditingTodoQuery(todoTitle);
  };

  const endEditTodo = (): void => {
    setEditingTodoId(null);
    setEditingTodoQuery('');
  };

  const editTodo = (todoId: number, todoTitle: string): void => {
    if (!editingTodoQuery.trim()) {
      handleDeleteTodoById(todoId);
    } else if (editingTodoQuery.trim() !== todoTitle) {
      handleRenameTodo(todoId, editingTodoQuery.trim());
    }

    endEditTodo();
  };

  const handleOnChangeEditingTodo = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEditingTodoQuery(event.target.value);
  };

  const handleOnKeyUpEditingTodo = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Escape') {
      endEditTodo();
    }
  };

  const handleSubmitEditingTodo = (
    event: React.FormEvent<HTMLFormElement>,
    todoId: number,
    todoTitle: string,
  ): void => {
    event.preventDefault();

    editTodo(todoId, todoTitle);
  };

  const handleOnBlurEditingTodo = (todoId: number, todoTitle: string): void => {
    editTodo(todoId, todoTitle);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        const { id, title, completed } = todo;

        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed })}
            key={id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={completed}
                onChange={() => handleCheckboxChange(id, completed)}
              />
            </label>

            {editingTodoId === id ? (
              <form
                onSubmit={event => handleSubmitEditingTodo(event, id, title)}
              >
                <input
                  ref={editingTodoField}
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={editingTodoQuery}
                  onChange={handleOnChangeEditingTodo}
                  onKeyUp={handleOnKeyUpEditingTodo}
                  onBlur={() => handleOnBlurEditingTodo(id, title)}
                />
              </form>
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => startEditTodo(id, title)}
                >
                  {title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => handleDeleteTodoById(id)}
                >
                  ×
                </button>
              </>
            )}

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}

      {false && (
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
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
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
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
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
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
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
        </>
      )}
    </section>
  );
};
