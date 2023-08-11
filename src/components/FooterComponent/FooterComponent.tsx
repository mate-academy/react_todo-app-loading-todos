import classNames from 'classnames';

import { useContext } from 'react';
import { AppContext } from '../../context';
import { Types } from '../../reducer';
import { deleteTodo } from '../../api/todos';

export const FooterComponent:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { filter, todos } = state;

  const isShowingClearBtn = (
    () => (state.itemsLeft() !== state.todos.length)
  )();

  const filterBy = (
    e:React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    filterByType: Types.FilterAll | Types.FilterActive | Types.FilterCompleted,
  ) => {
    e.preventDefault();
    dispatch({
      type: filterByType,
    });
  };

  const clearCompleted = () => {
    todos.forEach(({ id }) => {
      dispatch({
        type: Types.SetUpdatedTodoId,
        payload: {
          updatedTodoId: id,
        },
      });
      deleteTodo(id)
        .then(() => {
          dispatch({
            type: Types.Delete,
            payload: {
              id,
            },
          });
        })
        .catch(() => {
          if (!state.errorMessage) {
            dispatch({
              type: Types.SetErrorMessage,
              payload: {
                errorMessage: 'Can\'t delete a todo',
              },
            });
          }
        })
        .finally(() => {
          dispatch({
            type: Types.RemoveUpdatedTodoId,
            payload: {
              updatedTodoId: id,
            },
          });
        });
    });
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${state.itemsLeft()} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filter === 'all' },
          )}
          onClick={(e) => filterBy(e, Types.FilterAll)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filter === 'active' },
          )}
          onClick={(e) => filterBy(e, Types.FilterActive)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filter === 'completed' },
          )}
          onClick={(e) => filterBy(e, Types.FilterCompleted)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        disabled={!isShowingClearBtn}
        style={{
          opacity: isShowingClearBtn ? '100' : '0',
          cursor: isShowingClearBtn ? 'pointer' : 'default',
        }}
        className="todoapp__clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>

    </footer>
  );
};
