/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useMemo } from 'react';
import cn from 'classnames';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { TodoContext } from '../TodoContext/TodoContext';
import { Notification } from '../Notification/Notification';

export const TodoApp: React.FC = () => {
  const { todos, allTodos } = useContext(TodoContext);

  const activeTodos = useMemo(() => {
    return allTodos.filter(todo => !todo.completed);
  }, [allTodos]);

  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {activeTodos.length > 0 && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {allTodos.length > 0 && (
          <>
            <TodoList />

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${activeTodos.length} items left`}
              </span>

              <TodosFilter />

              {/* don't show this button if there are no completed todos */}
              <button
                type="button"
                className={cn('todoapp__clear-completed',
                  { 'is-invisible': completedTodos.length === 0 })}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <Notification />
    </div>
  );
};
