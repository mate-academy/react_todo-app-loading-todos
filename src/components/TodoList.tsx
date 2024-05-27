/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { CreatedContext } from './TodoContext';
import classNames from 'classnames';

export const TodoList = () => {
  const { todos, setTodos, toDoTitle, filterButton } =
    useContext(CreatedContext);
  const [edittedTitle, setEdittedTitle] = useState<string>('');
  const [edittedId, setEdittedId] = useState<number | null>(null);
  const handleChangeStatus = (todo: Todo) => {
    const newTodo: Todo = {
      ...todo,
      completed: !todo.completed,
    };

    const changedTodo = todos.map(curTodo =>
      curTodo.id === todo.id ? newTodo : curTodo,
    );

    setTodos(changedTodo);
  };

  const deleteTodo = (idNumber: number) => {
    const updateTodo = todos.filter(todo => todo.id !== idNumber);

    setTodos(updateTodo);
  };

  const filteredTodos = useMemo(() => {
    switch (filterButton) {
      case 'all':
        return todos;
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return;
    }
  }, [todos, filterButton]);

  const editTodo = (idNumber: number, newTitle: string) => {
    const updateTodo = todos.map(todo => {
      if (todo.id === idNumber) {
        return { ...todo, title: newTitle };
      }

      return todo;
    });

    setTodos(updateTodo);
  };

  const handleSavingTitle = (idNumber: number) => {
    const trimmedTitle = edittedTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(idNumber);
    } else {
      editTodo(idNumber, trimmedTitle);
    }

    setEdittedId(null);
  };

  const handleDoubleClick = (newId: number, newTitle: string) => {
    setEdittedTitle(newTitle);
    setEdittedId(newId);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    idNumber: number,
  ) => {
    if (event.key === 'Enter') {
      handleSavingTitle(idNumber);
    } else if (event.key === 'Escape') {
      setEdittedId(null);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.length > 0 &&
        filteredTodos?.map(todo => (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                value={toDoTitle}
                onClick={() => handleChangeStatus(todo)}
              />
            </label>

            {edittedId !== null && edittedId === todo.id ? (
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                onBlur={() => handleSavingTitle(todo.id)}
                value={edittedTitle}
                onChange={e => setEdittedTitle(e.target.value)}
                onKeyUp={event => handleKeyPress(event, todo.id)}
                autoFocus
              />
            ) : (
              <>
                {' '}
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
                >
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ×
                </button>{' '}
              </>
            )}

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))}

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </section>
  );
};
