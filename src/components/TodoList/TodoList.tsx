import React, { useEffect, useRef, useState } from 'react';
import {
  deleteTodo,
  getTodos,
  updateTodoStatus,
  updateTodoTitle,
} from '../../api/todos';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import cn from 'classnames';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  filteredTodos: Todo[];
  todos: Todo[];
  tempTodo: Todo | null;
  setLoadingTodosId: React.Dispatch<React.SetStateAction<number[]>>;
  loadingTodosId: number[];
  addIdToLoad: (arg: number) => void;
};

export const TodoList: React.FC<Props> = ({
  setTodos,
  setErrorMessage,
  filteredTodos,
  todos,
  tempTodo,
  setLoadingTodosId,
  loadingTodosId,
  addIdToLoad,
}) => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const cancelEditing = () => {
    setQuery('');
    setLoadingTodosId([]);
    setEditingTodo(null);
  };

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelEditing();
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage('Unable to load todos');
        throw error;
      }
    };

    fetchTodos();
  }, []);

  const handleOnClickDelete = async (todoForDelate: Todo) => {
    addIdToLoad(todoForDelate.id);
    try {
      await deleteTodo(todoForDelate.id);
      setTodos(todos.filter(todo => todoForDelate.id !== todo.id));
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
      throw error;
    } finally {
      setLoadingTodosId([]);
    }
  };

  const saveChanges = async () => {
    if (!query && editingTodo !== null) {
      addIdToLoad(editingTodo.id);
      try {
        await deleteTodo(editingTodo.id);
        setTodos(todos.filter(todo => editingTodo.id !== todo.id));
      } catch (error) {
        setErrorMessage('Unable to delete a todo');
        throw error;
      } finally {
        setLoadingTodosId([]);
      }
    }

    if (query === editingTodo?.title) {
      cancelEditing();

      return;
    }

    if (query && editingTodo) {
      try {
        addIdToLoad(editingTodo.id);
        setTodos(prevTodos => {
          return prevTodos.map(prevTodo => {
            if (prevTodo.id === editingTodo.id) {
              return {
                ...prevTodo,
                title: query,
              };
            }

            return prevTodo;
          });
        });
        await updateTodoTitle(editingTodo.id, query);
        if (inputRef.current) {
          inputRef.current.blur();
        }
      } catch (error) {
        setErrorMessage('Unable to update a todo');
        throw error;
      } finally {
        setQuery('');
        setLoadingTodosId([]);
        setEditingTodo(null);
      }
    }
  };

  useEffect(() => {
    if (editingTodo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodo]);

  const handleOnChangeStatus = async (todoForChange: Todo) => {
    try {
      addIdToLoad(todoForChange.id);
      await updateTodoStatus(todoForChange.id, !todoForChange.completed);
    } catch (error) {
      setErrorMessage('Unable to update a todo');
      throw error;
    } finally {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === todoForChange.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      );
      setLoadingTodosId([]);
    }
  };

  const handleOnDoubleClick = (thisTodo: Todo) => {
    setEditingTodo(thisTodo);
    setQuery(thisTodo.title);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveChanges();
  };

  const handleOnBlur = () => {
    saveChanges();
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
            <input
              aria-labelledby={`todo-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked
              onChange={() => handleOnChangeStatus(todo)}
            />
          </label>

          {editingTodo?.id !== todo.id ? (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => handleOnDoubleClick(todo)}
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleOnClickDelete(todo)}
              >
                ×
              </button>
            </>
          ) : (
            <form onSubmit={handleOnSubmit}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                ref={inputRef}
                value={query}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
              />
            </form>
          )}

          <div
            data-cy="TodoLoader"
            className={cn('modal', 'overlay', {
              'is-active': loadingTodosId.includes(todo.id),
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
      {tempTodo !== null && <TodoItem tempTodo={tempTodo} />}
    </section>
  );
};
