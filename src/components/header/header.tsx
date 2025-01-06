import { Dispatch, SetStateAction, useState } from 'react';
import { Todo } from '../../types/Todo';
import { createTodo } from '../../api/todos';

type HeaderProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setError: (message: string) => void;
};

export const Header: React.FC<HeaderProps> = ({ setTodos, setError }) => {
  const [inputValue, setInputValue] = useState('');

  function addTodo(event: React.FormEvent) {
    event.preventDefault();

    if (inputValue.trim() === '') {
      setError('Title should not be empty');

      return;
    }

    const newTodo: Omit<Todo, 'id'> = {
      userId: 1551,
      title: inputValue,
      completed: false,
    };

    createTodo(newTodo)
      .then(currentNewTodo => {
        setTodos(currentToDos => [...currentToDos, currentNewTodo]);
        setInputValue('');
        setError('');
      })
      .catch(() => setError('Unable to add a todo'));
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
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
