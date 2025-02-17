import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';
import { USER_ID } from '../api/todos';

type Props = {
  todos: Todo[];
  onAdd: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Header: React.FC<Props> = ({ todos, onAdd }) => {
  const [inputValue, setInputValue] = useState('');
  const [isAllCompleted, setIsAllCompleted] = useState(() =>
    todos.every(todo => todo.completed),
  );

  useEffect(() => {
    if (todos.every(todo => todo.completed)) {
      setIsAllCompleted(false);
    } else {
      setIsAllCompleted(true);
    }
  }, [todos]);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: inputValue,
      completed: false,
      userId: USER_ID,
    };

    onAdd(prevTodos => [newTodo, ...prevTodos]);
    setInputValue('');
  };

  const toggleAll = () => {
    const toggledTodos = todos.map(todo => {
      const currentTodo = { ...todo };

      currentTodo.completed = isAllCompleted;

      return currentTodo;
    });

    onAdd(toggledTodos);
    setIsAllCompleted(!isAllCompleted);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={cn('todoapp__toggle-all active', {
          active: !isAllCompleted,
        })}
        data-cy="ToggleAllButton"
        onClick={toggleAll}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={addTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
      </form>
    </header>
  );
};
