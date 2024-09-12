import cn from 'classnames';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { deleteTodo } from '../../api/todos';
import { client } from '../../utils/fetchClient';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: (value: React.SetStateAction<Todo[]>) => void;
  isLoading: number;
  setIsLoading: React.Dispatch<React.SetStateAction<number>>;
  setError: (value: React.SetStateAction<string>) => void;
  setIsErrorShown: React.Dispatch<React.SetStateAction<boolean>>;
  onTodoFocus: () => void;
  allCrossed: boolean;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  isLoading,
  setIsLoading,
  setError,
  setIsErrorShown,
  onTodoFocus,
  allCrossed,
}) => {
  const [editedInput, setEditedInput] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const currentEditField: RefObject<HTMLInputElement> = useRef(null);

  const handleRemove = (todoId: number) => {
    async function getDeleted() {
      setIsLoading(todoId);

      try {
        await deleteTodo(todoId);
        setTodos(todos.filter(t => t.id !== todoId));
      } catch {
        setTodos(todos);
        setError('Unable to delete a todo');
        setIsErrorShown(true);
      } finally {
        setIsLoading(0);
      }
    }

    getDeleted();
  };

  const handleToggle = () => {
    setIsLoading(todo.id);

    async function updatedTodos() {
      try {
        setTodos(
          todos.map((t: Todo) => {
            if (t.id === todo.id) {
              return {
                ...t,
                completed: !t.completed,
              };
            }

            return t;
          }),
        );
        await client.patch(todo.id.toString(), (prev: Todo) => ({
          ...prev,
          completed: !prev.completed,
        }));
      } catch {
        setError('Unable to update a todo');
        setIsErrorShown(true);
        setTodos(todos);
      } finally {
        setIsLoading(0);
      }
    }

    updatedTodos();
  };

  const handleIsEdited = () => {
    setIsEdited(true);
    setEditedInput(todo.title);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedInput(e.target.value);
  };

  const handleCloseEditField = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEdited(false);
      onTodoFocus();
    }
  };

  const handleEditSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    async function editData() {
      setIsLoading(todo.id);
      try {
        if (editedInput.trim()) {
          if (editedInput !== todo.title) {
            setTodos(
              todos.map((t: Todo) => {
                if (t.id === todo.id) {
                  return {
                    ...t,
                    title: editedInput,
                  };
                }

                return t;
              }),
            );
            await client.patch(todo.id.toString(), (prev: Todo) => ({
              ...prev,
              title: editedInput,
            }));
          }
        }

        if (!editedInput.trim()) {
          try {
            setTodos(todos.filter((t: Todo) => t.id !== todo.id));
            await client.delete(todo.id.toString());
          } catch {
            setError('Unable to delete a todo');
            setIsErrorShown(true);
            setTodos(todos);
          }
        }

        setIsEdited(false);
      } catch {
        setError('Unable to update a todo');
        setIsErrorShown(true);
        setTodos(todos);
      } finally {
        setIsLoading(0);
      }
    }

    onTodoFocus();
    editData();
    setEditedInput('');
    setIsEdited(false);
  };

  useEffect(() => {
    if (currentEditField.current) {
      currentEditField.current.focus();
    }
  }, [isEdited]);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
      onDoubleClick={handleIsEdited}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={handleToggle}
        />
      </label>

      {isEdited ? (
        // eslint-disable-next-line
        <form
          onSubmit={handleEditSubmission}
          onKeyDown={handleCloseEditField}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={currentEditField}
            onChange={handleInput}
            value={editedInput}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleRemove(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': isLoading === todo.id || allCrossed,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
