import React, { } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { deleteTodos, updateTodos } from '../../api/todos';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  // const [isCompleted, setIsCompleted] = useState(false);

  const handleDelete = (todoId: number) => {
    deleteTodos(todoId);
    setTodos((currentTodos) => currentTodos.filter(todo => todo.id !== todoId));
  };

  const handleChangeComplete = (todo: Todo) => {
    // eslint-disable-next-line no-param-reassign
    todo.completed = !todo.completed;

    updateTodos(todo)
      .then(data => setTodos((currentTodos) => {
        return [
          ...currentTodos
            .map(todoMap => (todoMap.id === todo.id ? data : todoMap)),
        ];
      }));
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}

      {todos.map((todo) => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.completed,
          })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleChangeComplete(todo)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

      {/* This todo is being edited */}
      {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label> */}

      {/* This form is shown instead of the title and remove button */}
      {/* <form>
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
          </div> */}

      {/* This todo is in loadind state */}
      {/* <div data-cy="Todo" className="todo">
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
            </button> */}

      {/* 'is-active' class puts this modal on top of the todo */}
      {/* <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}
    </section>
  );
};
