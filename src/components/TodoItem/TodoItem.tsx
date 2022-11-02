import React, { useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { editTodo, deleteTodo } from '../../api/todos';

type Props = {
  todo: Todo
  setTodoList: (x: Todo[]) => void
  todoList: Todo[]
  loadingItems: number[]
  setUpdateError: (x: boolean) => void
  setDeleteError: (x: boolean) => void
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todoList,
  setTodoList,
  loadingItems,
  setUpdateError,
  setDeleteError,
}) => {
  const { title, id, completed } = todo;

  const [loaderTodo, setLoaderTodo] = useState(false);
  const [TodoDelete, setTodoDelet] = useState(false);

  // functions

  const checkboxActive = () => {
    setLoaderTodo(true);

    setTodoList([...todoList.map(todoItem => {
      if (todoItem.id === id) {
        return {
          ...todoItem,
          completed: !completed,
        };
      }

      return { ...todoItem };
    })]);

    editTodo(id, {
      completed: !completed,
    }).then(() => {
      setLoaderTodo(false);
    }).catch(() => {
      setUpdateError(true);

      setTodoList([...todoList.map(todoItem => {
        if (todoItem.id === id) {
          return {
            ...todoItem,
            completed,
          };
        }

        return { ...todoItem };
      })]);
      setLoaderTodo(false);
      setTimeout(() => {
        setUpdateError(false);
      }, 4000);
    });
  };

  const buttonDeleteTodo = () => {
    setLoaderTodo(true);
    deleteTodo(id)
      .then(() => {
        setTodoDelet(true);
        setLoaderTodo(false);
      }).catch(() => {
        setLoaderTodo(false);
        setDeleteError(true);
        setTimeout(() => {
          setUpdateError(false);
        }, 4000);
      });
  };

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed },
        { 'is-hidden': TodoDelete },
      )}
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={checkboxActive}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">{title}</span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={buttonDeleteTodo}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={classNames(
          'modal',
          'overlay',
          { 'is-active': loaderTodo || loadingItems.includes(id) },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
