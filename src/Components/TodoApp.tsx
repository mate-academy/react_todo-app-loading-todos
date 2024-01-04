/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useState,
} from 'react';
import cn from 'classnames';
import { TodoList } from './TodoList';
import {
  Actions,
  DispatchContext,
  Keys,
  StateContext,
} from './Store';

enum TodosType {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [todoTitle, setTodoTitle] = useState('');
  const rivel = false;
  const {
    allTodos,
  } = useContext(StateContext);
  const activeTodos = allTodos?.filter(todo => !todo.completed) || [];
  const completedTodos = allTodos?.filter(todo => todo.completed) || [];
  const [visibleTodosType, setVisibleTodosType] = useState(TodosType.all);

  let visibleTodos = allTodos;

  if (visibleTodosType === TodosType.all) {
    visibleTodos = allTodos;
  } else if (visibleTodosType === TodosType.active) {
    visibleTodos = activeTodos;
  } else {
    visibleTodos = completedTodos;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleBlur = () => {
    if (todoTitle.trim()) {
      dispatch({
        type: Actions.addNew,
        todo: {
          userId: 777,
          id: +new Date(),
          title: todoTitle,
          completed: false,
        },
      });
      setTodoTitle('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Keys.Enter && todoTitle.trim()) {
      e.preventDefault();
      dispatch({
        type: Actions.addNew,
        todo: {
          id: +new Date(),
          title: todoTitle,
          completed: false,
          userId: 777,
        },
      });
      setTodoTitle('');
    }

    return 0;
  };

  const setAllTodosVisible = () => {
    visibleTodos = allTodos;
    setVisibleTodosType(TodosType.all);
  };

  const setActiveTodosVisible = () => {
    visibleTodos = activeTodos;
    setVisibleTodosType(TodosType.active);
  };

  const setComplitedTodosVisible = () => {
    visibleTodos = completedTodos;
    setVisibleTodosType(TodosType.completed);
  };

  const handleToogleAll = () => {
    dispatch({ type: Actions.markAll });
  };

  const destroyCompletedTodos = () => {
    dispatch({ type: Actions.destroyCompleted });
  };

  if (rivel) {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {/* This is a completed todo */}
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

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* overlay will cover the todo while it is being updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>

        {/* This todo is not completed */}
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

        {/* This todo is being edited */}
        <div data-cy="Todo" className="todo">
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

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>

        {/* This todo is in loadind state */}
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
        </div>
      </section>
    );
  }

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            type="text"
            data-cy="NewTodoField"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </form>
      </header>
      {allTodos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
              onClick={handleToogleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={visibleTodos} />
          </section>

          <footer className="footer" data-cy="todosFilter">
            <span className="todo-count" data-cy="todosCounter">
              {activeTodos.length === 1
                ? `${activeTodos.length} item left`
                : `${activeTodos.length} items left`}
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={cn({
                    selected: visibleTodosType === TodosType.all,
                  })}
                  onClick={setAllTodosVisible}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={cn({
                    selected: visibleTodosType === TodosType.active,
                  })}
                  onClick={setActiveTodosVisible}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="#/completed"
                  className={cn({
                    selected: visibleTodosType === TodosType.completed,
                  })}
                  onClick={setComplitedTodosVisible}
                >
                  Completed
                </a>
              </li>
            </ul>

            {completedTodos.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={destroyCompletedTodos}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
