import { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { ErrorType } from '../types/Error';

type Props = {
  userId: number;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setError: (value: ErrorType) => void;
};

export const NewTodo: React.FC<Props> = ({
  userId,
  todos,
  setTodos,
  setError, // will set in nextTask afrer adding on server
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  function getId() {
    let id = 1;

    if (todos.length > 0) {
      id = Math.max(...todos.map(todo => todo.id)) + 1;

      return id;
    }

    return id;
  }

  function addTodo() { // temporary function before adding on server realisation
    const newTodo = {
      id: getId(),
      userId,
      title: newTodoTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
  }

  const visibleTodos = todos.length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  function handleTodosStatus() {
    let updatedTodos = [...todos];

    updatedTodos = updatedTodos.map(todo => ({ ...todo, completed: true }));

    setTodos(updatedTodos);
  }

  return (
    <header className="todoapp__header">
      {visibleTodos > 0 && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: hasCompletedTodos,
          })}
          onClick={handleTodosStatus}
        />
      )}

      <form onSubmit={addTodo}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
