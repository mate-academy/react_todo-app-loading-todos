import { memo, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import classNames from 'classnames';
import { USER_ID, addTodo } from '../../api/todos';

export const TodoHeader: React.FC = memo(() => {
  // TODO check some problems with POST
  const { state, dispatch } = useContext(AppContext);
  const { todos } = state;
  const allCompleted =
    todos.every(todo => todo.completed) && state.todos.length > 0;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const [todo, setTodo] = useState('');

  const handleTodoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todo.trim()) {
      dispatch({
        type: 'UPDATE_ERROR_STATUS',
        payload: { type: 'EmptyTitleError' },
      });

      return;
    }

    const newTodo = {
      id:
        state.todos.length > 0
          ? Math.max(...state.todos.map(task => task.id)) + 1
          : 1,
      userId: USER_ID,
      title: todo,
      completed: false,
    };

    try {
      await addTodo(newTodo);
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setTodo('');
    } catch (error) {
      dispatch({
        type: 'UPDATE_ERROR_STATUS',
        payload: { type: 'AddTodoError' },
      });
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: allCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleTodoSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todo}
          onChange={event => setTodo(event.target.value)}
        />
      </form>
    </header>
  );
});

TodoHeader.displayName = 'TodoHeader';
