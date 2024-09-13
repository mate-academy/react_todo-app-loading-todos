import { useState, useContext, useRef, useEffect } from 'react';
import cn from 'classnames';
import { FilterContext, InitialTodosContext, TodosContext } from '../store';
import { postTodo, updeteTodo, USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';

export const TodoHeader: React.FC = () => {
  const { todos, dispatch } = useContext(TodosContext)
  const { initialTodos, setInitialTodos } = useContext(InitialTodosContext);
  const { filter } = useContext(FilterContext);
  const [title, setTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const todosIsDone = todos.every(t => t.completed);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      userId: USER_ID,
      completed: false,
    };

    if (event.key === 'Enter' && title.trim()) {
      const { userId, title, completed } = newTodo;

      event.preventDefault();
      postTodo({ userId, title, completed })
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      dispatch({type: filter.toUpperCase(), payload: [...initialTodos, newTodo] } )
      setInitialTodos(prevState => [...prevState, newTodo]);

      setTitle('');
    }
  };

  const toggleAllTodosStatus = () => {
    const newStatus = todosIsDone ? false : true;

    const updatePromises = todos.map(todo =>
      updeteTodo({
        ...todo,
        completed: newStatus,
      })
    );

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: newStatus,
    }));

    dispatch({ type: 'TOGGLE_ALL_BUTTON', payload: updatedTodos });

    return Promise.all(updatePromises);
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { "active": todosIsDone })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodosStatus}
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          onKeyPress={handleKeyPress}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
