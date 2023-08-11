import { useCallback, useContext, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { ModalOverlayComponent } from '../ModalOverlayComponent';
import { AppContext } from '../../context';
import { Types } from '../../reducer';
import { deleteTodo, editTodo } from '../../api/todos';
import { USER_ID } from '../../utils/const';

type Props = {
  todo: Todo;
};

export const TodoItemComponent:React.FC<Props> = ({ todo }) => {
  const { state, dispatch } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);
  const { updatedTodoIds } = state;

  const handleToggleChange = useCallback(() => {
    dispatch({
      type: Types.SetUpdatedTodoId,
      payload: {
        updatedTodoId: todo.id,
      },
    });

    editTodo({
      ...todo,
      completed: !todo.completed,
    })
      .then(() => {
        dispatch({
          type: Types.ToggleCompleted,
          payload: {
            id: todo.id,
          },
        });

        dispatch({
          type: Types.RemoveUpdatedTodoId,
          payload: {
            updatedTodoId: todo.id,
          },
        });
      })
      .catch(() => {
        dispatch({
          type: Types.RemoveUpdatedTodoId,
          payload: {
            updatedTodoId: todo.id,
          },
        });

        dispatch({
          type: Types.SetErrorMessage,
          payload: {
            errorMessage: 'Can\'t update a todo',
          },
        });
      });
  }, []);

  const handleDeleteTodo = useCallback(
    () => {
      dispatch({
        type: Types.SetUpdatedTodoId,
        payload: {
          updatedTodoId: todo.id,
        },
      });

      deleteTodo(todo.id)
        .then(() => {
          dispatch({
            type: Types.Delete,
            payload: {
              id: todo.id,
            },
          });
        })
        .catch(() => {
          dispatch({
            type: Types.SetErrorMessage,
            payload: {
              errorMessage: 'Can\'t delete a todo',
            },
          });
        })
        .finally(() => {
          dispatch({
            type: Types.RemoveUpdatedTodoId,
            payload: {
              updatedTodoId: todo.id,
            },
          });
        });
    }, [],
  );

  const todoToEdit: Todo = {
    id: todo.id,
    userId: USER_ID,
    title: newTodoTitle,
    completed: todo.completed,
  };

  const editingTodoCompleted = async () => {
    if (!newTodoTitle.trim()) {
      dispatch({
        type: Types.SetUpdatedTodoId,
        payload: {
          updatedTodoId: todo.id,
        },
      });

      await deleteTodo(todo.id)
        .then(() => {
          dispatch({
            type: Types.Delete,
            payload: {
              id: todo.id,
            },
          });
          setIsEditing(false);
        })
        .catch(() => {
          dispatch({
            type: Types.RemoveUpdatedTodoId,
            payload: {
              updatedTodoId: todo.id,
            },
          });

          dispatch({
            type: Types.SetErrorMessage,
            payload: {
              errorMessage: 'Can\'t update a todo',
            },
          });
        })
        .finally(() => {
          dispatch({
            type: Types.RemoveUpdatedTodoId,
            payload: {
              updatedTodoId: todo.id,
            },
          });
        });

      return;
    }

    editTodo(todoToEdit)
      .then(() => {
        dispatch({
          type: Types.Edit,
          payload: {
            todoToEdit,
          },
        });
        setIsEditing(false);
      })
      .catch(() => {
        dispatch({
          type: Types.RemoveUpdatedTodoId,
          payload: {
            updatedTodoId: todoToEdit.id,
          },
        });

        dispatch({
          type: Types.SetErrorMessage,
          payload: {
            errorMessage: 'Can\'t update a todo',
          },
        });
      })
      .finally(() => {
        dispatch({
          type: Types.RemoveUpdatedTodoId,
          payload: {
            updatedTodoId: todoToEdit.id,
          },
        });
      });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setNewTodoTitle(todo.title);
  };

  return (
    <div
      className={classNames(
        'todo',
        { completed: todo.completed },
      )}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onChange={handleToggleChange}
        />
      </label>
      {!isEditing
        ? (
          <>
            <span
              className="todo__title"
              onDoubleClick={() => {
                setIsEditing(true);
                setTimeout(() => {
                  document.getElementById(`${todo.id}_edit`)?.focus();
                }, 0);
              }}
            >
              {todo.title}
            </span>
            <button
              type="button"
              className="todo__remove"
              onClick={handleDeleteTodo}
            >
              ×
            </button>
          </>
        ) : (
          <form onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              id={`${todo.id}_edit`}
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value.trim())}
              onBlur={editingTodoCompleted}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  editingTodoCompleted();
                }

                if (e.key === 'Escape') {
                  cancelEditing();
                }
              }}
            />
          </form>
        )}

      <ModalOverlayComponent isActive={
        updatedTodoIds.includes(todo.id as never)
      }
      />
    </div>
  );
};
