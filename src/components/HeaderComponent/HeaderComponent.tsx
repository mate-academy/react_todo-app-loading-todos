import {
  useContext,
  useState,
} from 'react';
import classNames from 'classnames';

import { AppContext } from '../../context';
import { Types } from '../../reducer';
import { createTodo, editTodo } from '../../api/todos';
import { USER_ID } from '../../utils/const';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const HeaderComponent:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const isSelectedAll = ((): boolean => {
    if (!state.todos.length) {
      return false;
    }

    return state.todos.every(el => el.completed);
  })();

  const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTitle = title.trim();

    if (!newTitle) {
      setTitle('');

      return;
    }

    const tempId = +new Date();

    dispatch({
      type: Types.SetErrorMessage,
      payload: {
        errorMessage: '',
      },
    });

    dispatch({
      type: Types.Create,
      payload: {
        id: tempId,
        userId: USER_ID,
        title: newTitle,
        completed: false,
      },
    });

    dispatch({
      type: Types.SetUpdatedTodoId,
      payload: {
        updatedTodoId: tempId,
      },
    });

    createTodo({
      userId: USER_ID,
      title: newTitle,
      completed: false,
    }).then((newTodo) => {
      dispatch({
        type: Types.Edit,
        payload: {
          todoToEdit: newTodo,
          id: tempId,
        },
      });

      dispatch({
        type: Types.RemoveUpdatedTodoId,
        payload: {
          updatedTodoId: tempId,
        },
      });

      setTitle('');
    }).catch(() => {
      dispatch({
        type: Types.Delete,
        payload: {
          id: tempId,
        },
      });
      dispatch({
        type: Types.RemoveUpdatedTodoId,
        payload: {
          updatedTodoId: tempId,
        },
      });
      dispatch({
        type: Types.SetErrorMessage,
        payload: {
          errorMessage: 'Unable to add a todo',
        },
      });
    });
  };

  const handleSelectAll = async () => {
    await state.todos.forEach(todo => {
      dispatch({
        type: Types.SetUpdatedTodoId,
        payload: {
          updatedTodoId: todo.id,
        },
      });
      editTodo({
        ...todo,
        completed: !isSelectedAll,
      })
        .then((updatedTodo) => {
          dispatch({
            type: Types.Edit,
            payload: {
              todoToEdit: updatedTodo,
            },
          });
          dispatch({
            type: Types.RemoveUpdatedTodoId,
            payload: {
              updatedTodoId: todo.id,
            },
          });
        }).catch(() => {
          if (!state.errorMessage) {
            dispatch({
              type: Types.SetErrorMessage,
              payload: {
                errorMessage: 'Can\'t update a todo',
              },
            });
          }

          dispatch({
            type: Types.RemoveUpdatedTodoId,
            payload: {
              updatedTodoId: todo.id,
            },
          });
        });
    });
  };

  return (
    <header className="todoapp__header">
      {!!state.todos.length && (
        <button
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            { active: isSelectedAll },
          )}
          onClick={handleSelectAll}
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          onChange={handleInput}
          value={title}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};