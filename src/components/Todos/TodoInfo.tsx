/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC,
  memo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Todo } from '../../types/Todo';
import { deleteTodo, updateTodo } from '../../api/todos';

type Props = {
  todo: Todo;
  setTodos: (cb: (tds: Todo[]) => Todo[]) => void;
  setErrors: (ers: string[] | ((prv: string[]) => string[])) => void;
};

export const TodoInfo: FC<Props> = memo(({ todo, setTodos, setErrors }) => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (titleRef.current
      && !titleRef.current.contains(event.target as Node)
    ) {
      setEditMode(false);
    }
  }, [titleRef.current]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    };
  }, [handleClickOutside]);

  const addErrorCallback = useCallback((newError: string) => {
    return (prev: string[]) => [
      ...prev,
      newError,
    ];
  }, []);

  // eslint-disable-next-line no-console
  console.log(`Rendering todo: ${todo.id}`);

  const save = () => {
    if (titleRef.current) {
      setLoading(true);
      updateTodo(
        todo.id,
        { title: titleRef.current?.innerText || '' },
      )
        .then(res => {
          setTodos(prev => [...prev.map(item => {
            if (item.id === res.id) {
              return {
                ...item,
                title: titleRef.current?.innerText || '',
              };
            }

            return todo;
          })]);
        })
        .catch(_ => {
          setErrors(addErrorCallback('Unable to update a todo'));
        });
      setLoading(false);
    }
  };

  const remove = () => {
    setLoading(true);
    deleteTodo(todo.id)
      .then(_ => {
        setTodos(prev => prev.filter(item => item.id !== todo.id));
      })
      .catch(_ => {
        setErrors(addErrorCallback('Unable to delete a todo'));
      });
  };

  const handleCheckboxClick = () => {
    setLoading(true);
    updateTodo(todo.id, { completed: !todo.completed })
      .then(res => {
        setTodos(prev => [...prev.map(item => {
          if (item.id === res.id) {
            return res as Todo;
          }

          return item;
        })]);
      })
      .catch(_ => {
        setErrors(prev => [...prev, 'Unable to update a todo']);
      });
    setLoading(false);
  };

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''}`}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleCheckboxClick}
          disabled={loading}
        />
      </label>

      <span
        data-cy="TodoTitle"
        className="todo__title"
        ref={titleRef}
        onDoubleClick={() => setEditMode(true)}
        role="none"
        contentEditable={editMode}
        onKeyDown={e => {
          if (e.key === 'Enter' && editMode) {
            save();
            setEditMode(false);
          }
        }}
      >
        {todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={() => remove()}
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});
