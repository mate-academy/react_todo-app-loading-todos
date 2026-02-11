import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useState } from 'react';
import { deleteTodos } from '../api/todos';

type TodoListProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  loadingTodos: boolean;
  setLoadingTodos: (loading: boolean) => void;
  handleErrorMessage: (errorMessage: string) => void;
};

export function TodoList({
  todos,
  setTodos,
  loadingTodos,
  setLoadingTodos,
  handleErrorMessage,
}: TodoListProps) {
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  const handleDeleteTodo = async (id: number) => {
    if (todos.find(todo => todo.id === id)) {
      try {
        await deleteTodos(id);
        const newTodosList = todos.filter(todo => todo.id !== id);

        setTodos(newTodosList);
      } catch (error) {
        handleErrorMessage('Unable to delete a todo');
      } finally {
        setLoadingTodos(false);
      }
    }
  };

  const handleEditTodo = (todoEdited: Todo) => {
    setEditingTodo(todoEdited.id);
    setNewTitle(newTitle);
  };

  const handleEditedTodoSubmit = () => {
    event?.preventDefault();
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo =>
        todo.id === editingTodo ? (
          <div data-cy="Todo" className="todo" key={todo.id}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form onSubmit={handleEditedTodoSubmit}>
              <input
                autoFocus
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={newTitle === '' ? todo.title : newTitle}
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ) : (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
            onDoubleClick={() => handleEditTodo(todo)}
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              ×
            </button>

            <div
              data-cy="TodoLoader"
              className={classNames('modal', 'overlay', {
                'is-active': loadingTodos,
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ),
      )}
    </section>
  );
}

// <section className="todoapp__main" data-cy="TodoList">
//       {/* This is a completed todo */}
//       <div data-cy="Todo" className="todo completed">
//         {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//             checked
//           />
//         </label>

//         <span data-cy="TodoTitle" className="todo__title">
//           Completed Todo
//         </span>

//         {/* Remove button appears only on hover */}
//         <button type="button" className="todo__remove" data-cy="TodoDelete">
//           ×
//         </button>

//         {/* overlay will cover the todo while it is being deleted or updated */}
//         <div data-cy="TodoLoader" className="modal overlay">
//           <div className="modal-background has-background-white-ter" />
//           <div className="loader" />
//         </div>
//       </div>

//       {/* This todo is an active todo */}
//       <div data-cy="Todo" className="todo">
//         {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//           />
//         </label>

//         <span data-cy="TodoTitle" className="todo__title">
//           Not Completed Todo
//         </span>
//         <button type="button" className="todo__remove" data-cy="TodoDelete">
//           ×
//         </button>

//         <div data-cy="TodoLoader" className="modal overlay">
//           <div className="modal-background has-background-white-ter" />
//           <div className="loader" />
//         </div>
//       </div>

//       {/* This todo is being edited */}
//       <div data-cy="Todo" className="todo">
//         {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//           />
//         </label>

//         {/* This form is shown instead of the title and remove button */}
//         <form>
//           <input
//             data-cy="TodoTitleField"
//             type="text"
//             className="todo__title-field"
//             placeholder="Empty todo will be deleted"
//             value="Todo is being edited now"
//           />
//         </form>

//         <div data-cy="TodoLoader" className="modal overlay">
//           <div className="modal-background has-background-white-ter" />
//           <div className="loader" />
//         </div>
//       </div>

//       {/* This todo is in loading state */}
//       <div data-cy="Todo" className="todo">
//         {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//           />
//         </label>
//         <span data-cy="TodoTitle" className="todo__title">
//           Todo is being saved now
//         </span>
//         <button type="button" className="todo__remove" data-cy="TodoDelete">
//           ×
//         </button>
//         {/* 'is-active' class puts this modal on top of the todo */}
//         <div data-cy="TodoLoader" className="modal overlay is-active">
//           <div className="modal-background has-background-white-ter" />
//           <div className="loader" />
//         </div>
//       </div>
//     </section>
