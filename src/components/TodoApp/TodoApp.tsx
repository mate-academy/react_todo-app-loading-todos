import { useState } from 'react';
import { Todo } from '../../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
};

export const TodoApp:React.FC<Props> = ({ todos, setTodos }) => {
  const [newTitle, setNewTitle] = useState('');

  const handerInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const addTodo = () => {
    if (newTitle.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        userId: Date.now(),
        title: newTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setNewTitle('');
    }
  };

  const hanldlerEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTodo();
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
        />
      )}
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={handerInputTitle}
          onKeyDown={hanldlerEnter}
        />
      </form>
    </header>
  );
};

export default TodoApp;
