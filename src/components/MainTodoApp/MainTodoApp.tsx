import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { Category } from '../../types/Category';
import { CompletedTodo } from '../CompletedTodo';
import { ActiveTodo } from '../ActiveTodo';
import { LoadingTodo } from '../LoadingTodo';

interface Props {
  todos: Todo[];
  category: Category;
}

export const MainTodoApp: FC<Props> = ({ todos, category }) => {
  let visibleTodos = todos;

  if (category !== 'all') {
    visibleTodos = todos.filter(({ completed }) => {
      return (category === 'completed')
        ? completed
        : !completed;
    });
  }

  return (
    <>
      {visibleTodos.map(({ id, completed, title }) => {
        return (
          <section className="todoapp__main" key={id}>
            {/* This is a completed todo */}
            {completed && <CompletedTodo title={title} />}

            {/* This todo is not completed */}
            {!completed && <ActiveTodo title={title} />}

            {/* This todo is being edited */}
            {false && (
              <div className="todo">
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                  />
                </label>

                {/* This form is shown instead of the title and remove button */}
                <form>
                  <input
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value="Todo is being edited now"
                  />
                </form>

                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            )}

            {/* This todo is in loadind state */}
            {false && <LoadingTodo title={title} />}
          </section>
        );
      })}
    </>
  );
};
