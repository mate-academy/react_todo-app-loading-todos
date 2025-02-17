import React, { Dispatch, SetStateAction } from 'react';
import { TodoInterface } from '../../types/Todo';
import { deleteTodo, updateTodo } from '../../api/todos';

interface Props {
  todos: TodoInterface[];
  refreshTodos: Dispatch<SetStateAction<TodoInterface[]>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

export const Todo: React.FC<Props> = ({ todos, refreshTodos, setErrorMsg }) => {
  const handleOnclickCompletTodo = (idx: number) => {
    return () => {
      refreshTodos(arg => {
        const refreshedTd = [...arg];

        refreshedTd[idx].isAwaitServer = true;

        return refreshedTd;
      });

      const newTodos = [...todos];

      updateTodo(newTodos[idx].id, { completed: !newTodos[idx].completed })
        .then(res => {
          newTodos[idx] = res as TodoInterface;
          newTodos[idx].isAwaitServer = false;
          refreshTodos(arg => {
            const refreshedTd = [...arg];

            refreshedTd[idx].isAwaitServer = false;
            refreshedTd[idx].completed = !refreshedTd[idx].completed;

            return refreshedTd;
          });
        })
        .catch(() => setErrorMsg('Unable to load todos'));
    };
  };

  const handleOnDeleteButtonTodo = (idx: number) => {
    return () => {
      refreshTodos(arg => {
        const refreshedTd = [...arg];

        refreshedTd[idx].isAwaitServer = true;

        return refreshedTd;
      });

      deleteTodo(todos[idx].id).then(() => {
        refreshTodos(arg => {
          const refreshedTd = [...arg];

          refreshedTd.splice(
            refreshedTd.findIndex(e => e.id === refreshedTd[idx].id),
            1,
          );

          return refreshedTd;
        });
      });
    };
  };

  return (
    <>
      {todos.map(({ id, title, completed, isAwaitServer }, index) => {
        return (
          <div
            key={id}
            data-cy="Todo"
            className={`todo ${completed && 'completed'}`}
          >
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
              onClick={() => handleOnclickCompletTodo(index)}
            />

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={handleOnDeleteButtonTodo(index)}
            >
              ×
            </button>
            <div
              data-cy="TodoLoader"
              className={`modal overlay ${isAwaitServer && 'is-active'}`}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </>
  );
};

/**
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

 <button type="button" className="todo__remove" data-cy="TodoDelete">
   ×
 </button>

 <div data-cy="TodoLoader" className="modal overlay">
   <div className="modal-background has-background-white-ter" />
   <div className="loader" />
 </div>
</div>

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

<div data-cy="Todo" className="todo">
 <label className="todo__status-label">
   <input
     data-cy="TodoStatus"
     type="checkbox"
     className="todo__status"
   />
 </label>

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

 <div data-cy="TodoLoader" className="modal overlay is-active">
   <div className="modal-background has-background-white-ter" />
   <div className="loader" />
 </div>
</div>
 */
