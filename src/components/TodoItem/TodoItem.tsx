import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodo, updateTodo } from '../../api/todos';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  todo: Todo;
  setTodos: (todos: (Todo[] | ((prevTodos: Todo[]) => Todo[]))) => void;
  todos: Todo[];
  setErrorType: (errorType: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const TodoItem: React.FC<Props>
  = ({
    todo,
    setTodos,
    todos,
    setErrorType,
    isLoading,
    setIsLoading,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState(todo.title);
    const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
    const [isCompleted, setIsCompleted] = useState(todo.completed);
    const editField = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (editField.current) {
        editField.current.focus();
      }
    }, [selectedTodo]);

    const handleDeleteTodo = async () => {
      try {
        await deleteTodo(todo.id);
      } catch (errorObject) {
        setErrorType(ErrorType.delete);

        return;
      }

      setTodos((prevTodos: Todo[]) => {
        return prevTodos.filter((todoItem) => {
          return todoItem.id !== todo.id;
        });
      });
    };

    const handleKeyDown = async (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
        setNewTodoTitle(todo.title);
      }

      if (event.key === 'Enter') {
        if (newTodoTitle === todo.title) {
          setIsEditing(false);

          return;
        }

        if (newTodoTitle === '') {
          setIsEditing(false);
          handleDeleteTodo();
        } else {
          setIsLoading(true);

          try {
            await updateTodo({ ...todo, title: newTodoTitle })
              .then(() => {
                setTodos(todos.map((todoItem: Todo) => {
                  return todoItem.id === todo.id
                    ? {
                      ...todoItem,
                      title: newTodoTitle,
                    }
                    : todoItem;
                }));
                setIsLoading(false);
                setIsEditing(false);
              });
          } catch (errorObject) {
            // eslint-disable-next-line no-console
            console.log(errorObject);
            setIsLoading(false);
            setIsEditing(false);
            setErrorType(ErrorType.update);
            setNewTodoTitle(todo.title);
          }
        }
      }
    };

    const handleBlur = async () => {
      if (newTodoTitle === todo.title) {
        setIsEditing(false);

        return;
      }

      if (newTodoTitle === '') {
        setIsEditing(false);

        handleDeleteTodo();
      } else {
        setIsLoading(true);

        try {
          await updateTodo({ ...todo, title: newTodoTitle })
            .then(() => {
              setTodos(todos.map((todoItem: Todo) => {
                return todoItem.id === todo.id
                  ? {
                    ...todoItem,
                    title: newTodoTitle,
                  }
                  : todoItem;
              }));
              setIsLoading(false);
              setIsEditing(false);
            });
        } catch (errorObject) {
          // eslint-disable-next-line no-console
          console.log(errorObject);
          setIsLoading(false);
          setIsEditing(false);
          setErrorType(ErrorType.update);
          setNewTodoTitle(todo.title);
        }
      }
    };

    const handleCompletedChange = async () => {
      setIsCompleted(!isCompleted);

      const completedStateSetter = () => {
        setTodos((prevTodos) => {
          const newTodos = [...prevTodos];
          const todoIndex = newTodos.findIndex((t) => t.id === todo.id);

          newTodos[todoIndex].completed = !todo.completed;

          return newTodos;
        });
      };

      completedStateSetter();

      try {
        await updateTodo({
          ...todo,
          completed: !isCompleted,
        });
      } catch (ErrorObject) {
        // eslint-disable-next-line no-console
        console.log(ErrorObject);
        setErrorType(ErrorType.update);

        completedStateSetter();
      }
    };

    const handleTodoEdit = (event: React.MouseEvent) => {
      event.preventDefault();

      setSelectedTodo(todo.id);

      if (editField.current) {
        editField.current.focus();
      }
    };

    return (
      <>
        <div
          data-cy="Todo"
          className={classNames(
            'todo',
            { completed: todo.completed },
          )}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked={todo.completed}
              onChange={handleCompletedChange}
            />
          </label>

          {isEditing && selectedTodo === todo.id ? (
            <>
              <input
                value={newTodoTitle}
                data-cy="NewTodoField"
                type="text"
                ref={editField}
                className={classNames(
                  'todo__edit_input',
                  { 'todo__edit_input--loading': isLoading },
                )}
                onChange={(event) => {
                  setNewTodoTitle(event.target.value);
                }}
                disabled={!isEditing}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
              />

              {isLoading && (
                <span className="todo__loader loader" />
              )}
            </>
          ) : (
            <span
              onDoubleClick={(event) => {
                setIsEditing(true);
                handleTodoEdit(event);
              }}
              data-cy="TodoTitle"
              className="todo__title"
            >
              {todo.title}
            </span>
          )}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
            onClick={handleDeleteTodo}
          >
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      </>
    );
  };
