import cn from 'classnames';
import { Todo } from '../types/Todo';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { USER_ID, createTodos, updateTodos } from '../api/todos';
import { ErrorTypes } from '../types/enums';
import { handleError } from '../utils/services';

type Props = {
  todos: Todo[];
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: (errorMessage: ErrorTypes) => void;
  setLoading: React.Dispatch<React.SetStateAction<number[]>>;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Header: React.FC<Props> = ({
  todos,
  isFocused,
  setIsFocused,
  setTodos,
  setErrorMessage,
  setLoading,
  setTempTodo,
}) => {
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const normalisedTitle = title.trim();

  const isSomeTodoCompleted = useMemo(
    () => todos.some(todo => !todo.completed),
    [todos],
  );

  useEffect(() => {
    if (inputRef.current && isFocused) {
      inputRef.current.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isFocused]);

  const onPatch = (todo: Todo) => {
    setLoading(prev => [...prev, todo.id]);

    updateTodos(todo.id, todo)
      .catch(() => handleError(ErrorTypes.updErr, setErrorMessage))
      .finally(() => {
        setLoading(prev => prev.filter(item => item !== todo.id));
      });
  };

  const onButtonClick = () => {
    if (isSomeTodoCompleted) {
      const optimizedTodos = todos
        .filter(todo => todo.completed !== true)
        .map(todo => ({ ...todo, completed: true }));

      setTodos(prev => prev.map(todo => ({ ...todo, completed: true })));
      optimizedTodos.map(todo => onPatch({ ...todo, completed: true }));
    } else {
      const optimizedTodos = todos
        .filter(todo => todo.completed === true)
        .map(todo => ({ ...todo, completed: true }));

      setTodos(prev => prev.map(todo => ({ ...todo, completed: false })));
      optimizedTodos.map(todo => onPatch({ ...todo, completed: false }));
    }
  };

  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (normalisedTitle === '') {
      handleError(ErrorTypes.titleErr, setErrorMessage);
    } else {
      setTempTodo((prevTempTodos: Todo[]) => [
        ...prevTempTodos,
        {
          id:
            prevTempTodos.length > 0
              ? Math.max(...prevTempTodos.map(prevTodo => prevTodo.id)) + 1
              : Math.floor(Math.random() * 100),
          userId: 404,
          title: normalisedTitle,
          completed: false,
        },
      ]);

      setIsFocused(false);
      setIsInputDisabled(true);

      createTodos({ userId: USER_ID, completed: false, title: normalisedTitle })
        .then(resp => {
          setTodos((prevTodos: Todo[]) => [
            ...prevTodos,
            {
              id: resp.id,
              userId: resp.userId,
              title: resp.title,
              completed: resp.completed,
            },
          ]);
          setIsFocused(true);
          setTempTodo(() => []);
          setLoading(prev =>
            prev.filter(
              item => item === Math.max(...todos.map(todo => todo.id)),
            ),
          );
          setIsInputDisabled(false);
          setTitle('');
        })
        .catch(() => {
          setTempTodo(() => []);
          setIsInputDisabled(false);
          setIsFocused(true);
          handleError(ErrorTypes.addErr, setErrorMessage);
        });
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: !isSomeTodoCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => onButtonClick()}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          ref={inputRef}
          type="text"
          className="todoapp__new-todo"
          disabled={isInputDisabled}
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </form>
    </header>
  );
};
