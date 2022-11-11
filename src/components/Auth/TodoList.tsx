import React, { useState } from 'react';
// import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodo, editTodo } from '../../api/todos';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  getTodosFromServer: () => Promise<void>;
  // isAdding: boolean;
  // handleDeleteTodo: (id: number) => void;
  // handleEditTodo: (id: number, comleted: boolean) => void;
  // isCompleted:boolean;
};

export const TodoList: React.FC<Props> = (
  { todos, getTodosFromServer },
) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleEditTodo = async (id: number, comleted: boolean) => {
    // const changeComplted =
    // !comleted;

    setIsCompleted(!isCompleted);
    await editTodo(id, !comleted);
    getTodosFromServer();
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      getTodosFromServer();
    } catch (err) {
      // setHasError(true);
      // setDeleteError(true);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo: Todo) => (
        // const { completed, id, title } = todo;
        // const { completed, id, title } = todo;
        <TodoItem
          // todo={todo}
          handleEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
          isCompleted={isCompleted}
          todo={todo}
          // completed={todo.completed}
          // id={todo.id}
          // title={todo.title}
        />
        // <div data-cy="Todo" className={cn('todo', { completed })} key={id}>
        //   <label className="todo__status-label">
        //     <input
        //       data-cy="TodoStatus"
        //       type="checkbox"
        //       className="todo__status"
        //       checked={completed}
        //       onChange={(event) => handleEditTodo(id, event.target.checked)}
        //     />
        //   </label>

        //   <span data-cy="TodoTitle" className="todo__title">
        //     {title}
        //   </span>
        //   <button
        //     type="button"
        //     className="todo__remove"
        //     data-cy="TodoDeleteButton"
        //     onClick={() => handleDeleteTodo(id)}
        //   >
        //     ×
        //   </button>

        //   <div data-cy="TodoLoader" className="modal overlay">
        //     <div className="modal-background has-background-white-ter" />
        //     <div className="loader" />
        //   </div>
        // </div>
      ))}
      {/* {isAdding && <TodoItem
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        isCompleted={isCompleted}
        todo={todo}
      />
      } */}

      {/* <div data-cy="Todo" className="todo completed">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            defaultChecked
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          HTML
        </span>
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
        >
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
          CSS
        </span>

        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
        >
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
            defaultValue="JS"
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
          React
        </span>
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
        >
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
          Redux
        </span>
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
        >
          ×
        </button>

        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div> */}
    </section>
  );
};
