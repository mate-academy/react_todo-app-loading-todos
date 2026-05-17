import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todoList?: Todo[];
  onDeleteTodo: (id: Todo['id']) => void;
  selectedTodoId: Todo['id'] | null;
}

export const TodoList: React.FC<Props> = ({
  todoList = [],
  onDeleteTodo,
  selectedTodoId,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onDelete={onDeleteTodo}
          loading={selectedTodoId === todo.id}
        />
      ))}

      {/*/!* This is a completed todo *!/*/}
      {/*<div data-cy="TodoItem" className="todo completed">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*      checked*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  <span data-cy="TodoTitle" className="todo__title">*/}
      {/*    Completed TodoItem*/}
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
      {/*<div data-cy="TodoItem" className="todo">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  <span data-cy="TodoTitle" className="todo__title">*/}
      {/*    Not Completed TodoItem*/}
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
      {/*<div data-cy="TodoItem" className="todo">*/}
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
      {/*      value="TodoItem is being edited now"*/}
      {/*    />*/}
      {/*  </form>*/}

      {/*  <div data-cy="TodoLoader" className="modal overlay">*/}
      {/*    <div className="modal-background has-background-white-ter" />*/}
      {/*    <div className="loader" />*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*/!* This todo is in loadind state *!/*/}
      {/*<div data-cy="TodoItem" className="todo">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  <span data-cy="TodoTitle" className="todo__title">*/}
      {/*    TodoItem is being saved now*/}
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
