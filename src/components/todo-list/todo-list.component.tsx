import React, { useCallback, useState } from 'react';
import { TodoListTypes } from './todo-list.types';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { updateTodos } from '../../api/todos';
import { LoaderComponent } from '../loader/loader.component';

export const TodoListComponent: React.FC<TodoListTypes> = ({
  todos,
  onSelected,
  setTodos,
  setError,
}) => {
  const [isLoadingId, setIsLoadingIdId] = useState<number | null>(null);

  const handleSelectedTodo = useCallback(
    (todo: Todo) => {
      setIsLoadingIdId(todo.id);

      const updatedTodo = { ...todo, completed: !todo.completed };

      setError('');

      updateTodos(todo.id, updatedTodo)
        .then(() => {
          setTodos(prevTodos =>
            prevTodos.map(t => (t.id === todo.id ? updatedTodo : t)),
          );
          onSelected(updatedTodo);
        })
        .catch(err => {
          setError('failed to update there');
          throw new Error(err);
        })
        .finally(() => setIsLoadingIdId(null));
    },
    [setTodos, onSelected],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
        >
          <LoaderComponent isLoading={isLoadingId === todo.id} />
          <label className="todo__status-label">
            <input
              onChange={() => handleSelectedTodo(todo)}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>
        </div>
      ))}

      {/*<div data-cy="Todo" className="todo completed">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*      checked*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  <span data-cy="TodoTitle" className="todo__title">*/}
      {/*    Completed Todo*/}
      {/*  </span>*/}

      {/*  /!* Remove button appears only on hover *!/*/}
      {/*  <button type="button" className="todo__remove" data-cy="TodoDelete">*/}
      {/*    ×*/}
      {/*  </button>*/}

      {/*  /!* overlay will cover the todo while it is being deleted or updated *!/*/}
      {/*  <div data-cy="TodoLoader" className="modal overlay">*/}
      {/*    <div className="modal-background has-background-white-ter" />*/}
      {/*    <div className="loader" />*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*/!* This todo is an active todo *!/*/}
      {/*<div data-cy="Todo" className="todo">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  <span data-cy="TodoTitle" className="todo__title">*/}
      {/*    Not Completed Todo*/}
      {/*  </span>*/}
      {/*  <button type="button" className="todo__remove" data-cy="TodoDelete">*/}
      {/*    ×*/}
      {/*  </button>*/}

      {/*  <div data-cy="TodoLoader" className="modal overlay">*/}
      {/*    <div className="modal-background has-background-white-ter" />*/}
      {/*    <div className="loader" />*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*/!* This todo is being edited *!/*/}
      {/*<div data-cy="Todo" className="todo">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  /!* This form is shown instead of the title and remove button *!/*/}
      {/*  <form>*/}
      {/*    <input*/}
      {/*      data-cy="TodoTitleField"*/}
      {/*      type="text"*/}
      {/*      className="todo__title-field"*/}
      {/*      placeholder="Empty todo will be deleted"*/}
      {/*      value="Todo is being edited now"*/}
      {/*    />*/}
      {/*  </form>*/}

      {/*  <div data-cy="TodoLoader" className="modal overlay">*/}
      {/*    <div className="modal-background has-background-white-ter" />*/}
      {/*    <div className="loader" />*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*/!* This todo is in loadind state *!/*/}
      {/*<div data-cy="Todo" className="todo">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  <span data-cy="TodoTitle" className="todo__title">*/}
      {/*    Todo is being saved now*/}
      {/*  </span>*/}

      {/*  <button type="button" className="todo__remove" data-cy="TodoDelete">*/}
      {/*    ×*/}
      {/*  </button>*/}

      {/*  /!* 'is-active' class puts this modal on top of the todo *!/*/}
      {/*  <div data-cy="TodoLoader" className="modal overlay is-active">*/}
      {/*    <div className="modal-background has-background-white-ter" />*/}
      {/*    <div className="loader" />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </section>
  );
};
