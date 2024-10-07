import React from 'react';
import { Todo } from '../types/Todo';
// import { Loader } from './todoLoader';
import { TodoItem } from './todo';

type Props = {
  preparedTodos: Todo[] | null;
  loading: boolean;
  errorMessage: string;
  // isSubmitting: boolean;
};

export const TodoList: React.FC<Props> = ({
  preparedTodos,
  loading,
  errorMessage,
  // isSubmitting,
}) => {
  return (
    <>
      {preparedTodos?.map(todo => (
        <section key={todo.id} className="todoapp__main" data-cy="TodoList">
          {/* <TempTodo saveNewTodo={saveNewTodo} /> */}
          <TodoItem
            key={todo.id}
            todo={todo}
            loading={loading}
            errorMessage={errorMessage}
            // isSubmitting={isSubmitting}
          />

          {false && (
            <div data-cy="Todo" className="todo">
              {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
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

              {/* <Loader spinnerLoading={loadingTodoId === todo.id} /> */}
            </div>
          )}

          {/* This todo is in loadind state */}
          {false && (
            <div data-cy="Todo" className="todo">
              {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
              <label htmlFor="firstId" className="todo__status-label">
                <input
                  id="firstId"
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                Todo is being saved now
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* 'is-active' class puts this modal on top of the todo */}
              {/* <Loader spinnerLoading={loadingTodoId === todo.id} /> */}
            </div>
          )}
        </section>
      ))}
    </>
  );
};
