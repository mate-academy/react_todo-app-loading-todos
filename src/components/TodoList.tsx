/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import * as todosApi from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  filteredTodos: Todo[];
  setTodoStatus: (status: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  inputRef: React.RefObject<HTMLInputElement>;
  edditingTodoTitle: string;
  setEdditingTodoTitle: (title: string) => void;
  edditingTodo?: number;
  setEdditingTodo: (id?: number) => void;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todoStatus: boolean;
  setError: (error: string) => void;
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  setTodoStatus,
  setTodos,
  inputRef,
  edditingTodoTitle,
  setEdditingTodoTitle,
  edditingTodo,
  setEdditingTodo,
  setFilteredTodos,
  todoStatus,
  setError,
  todos,
}) => {
  const handleToBlur = (currentTodoItem: Todo) => {
    setEdditingTodo(undefined);
    todosApi
      .updateTodo(
        currentTodoItem.id,
        currentTodoItem.completed,
        edditingTodoTitle,
      )
      .then(updatedTodo => {
        setTodoStatus(true);
        const newTodos = [...todos];
        const index = newTodos.findIndex(todoo => todoo.id === updatedTodo.id);

        newTodos.splice(index, 1, updatedTodo);
        setTodos(newTodos);

        return newTodos;
      })
      .catch(() => {
        setError('Unable to update a todo');
        setTimeout(() => {
          setError('');
        }, 3000);
      })
      .finally(() => {
        setTodoStatus(false);
      });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todoToMap => (
        <div
          data-cy="Todo"
          className={`todo ${todoToMap.completed ? 'completed' : ''}`}
          key={todoToMap.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todoToMap.completed}
              onChange={() => {
                todosApi
                  .updateTodo(
                    todoToMap.id,
                    !todoToMap.completed,
                    todoToMap.title,
                  )
                  .then(updatedTodo => {
                    setTodoStatus(true);
                    setTodos(prevTodos => {
                      return prevTodos.map(todoItem =>
                        todoItem.id === updatedTodo.id ? updatedTodo : todoItem,
                      );
                    });
                  })
                  .finally(() => {
                    setTodoStatus(false);
                  });
              }}
            />
          </label>

          {edditingTodo === todoToMap.id ? (
            <form>
              <input
                ref={inputRef}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo w`ill be deleted"
                value={edditingTodoTitle}
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    handleToBlur(todoToMap);
                  } else if (e.key === 'Enter') {
                    todosApi
                      .deleteTodo(todoToMap.id)
                      .then(() => {
                        setTodoStatus(true);
                      })
                      .catch(() => {
                        setError('Unable to delete a todo');
                        setFilteredTodos(todos);
                        setTimeout(() => {
                          setError('');
                        }, 3000);
                      })
                      .finally(() => {
                        setTodoStatus(false);
                        setTodos(prevTodos =>
                          prevTodos.filter(
                            todoItem => todoItem.id !== todoToMap.id,
                          ),
                        );
                      });
                  }
                }}
                onChange={e => {
                  setEdditingTodoTitle(e.currentTarget.value);
                }}
                onBlur={() => {
                  handleToBlur(todoToMap);
                  if (edditingTodoTitle.trim() === '') {
                    todosApi
                      .deleteTodo(todoToMap.id)
                      .then(() => {
                        setTodoStatus(true);
                      })
                      .catch(() => {
                        setError('Unable to delete a todo');
                        setFilteredTodos(todos);
                        setTimeout(() => {
                          setError('');
                        }, 3000);
                      })
                      .finally(() => {
                        setTodoStatus(false);
                        setTodos(prevTodos =>
                          prevTodos.filter(
                            todoItem => todoItem.id !== todoToMap.id,
                          ),
                        );
                      });
                  }
                }}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => {
                  setEdditingTodo(todoToMap.id);
                  setEdditingTodoTitle(todoToMap.title);
                }}
              >
                {todoToMap.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => {
                  todosApi
                    .deleteTodo(todoToMap.id)
                    .then(() => {
                      setTodoStatus(true);
                    })
                    .catch(() => {
                      setError('Unable to delete a todo');
                      setFilteredTodos(todos);
                      setTimeout(() => {
                        setError('');
                      }, 3000);
                    })
                    .finally(() => {
                      setTodoStatus(false);
                      setTodos(prevTodos =>
                        prevTodos.filter(
                          todoItem => todoItem.id !== todoToMap.id,
                        ),
                      );
                    });
                }}
              >
                ×
              </button>
            </>
          )}

          <div
            data-cy="TodoLoader"
            className={`modal overlay ${todoStatus ? 'is-active' : ''}`}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
