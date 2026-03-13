import { addTodo, patchTodo } from '../../../api/todos';
import { ErrorType, Todo } from '../../../types';
import { useState } from 'react';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setError: React.Dispatch<React.SetStateAction<ErrorType>>;
};

export const Header: React.FC<Props> = ({ todos, setTodos, setError }) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const hasIncompletedTodos = todos.some(todo => !todo.completed);
  const allCompleted = todos.length > 0 && !hasIncompletedTodos;

  const handleToggleAll = () => {
    todos.forEach(todo => {
      patchTodo(todo.id, { completed: !allCompleted })
        .then(updatedTodo => {
          setTodos(prev =>
            prev.map(t => (t.id === updatedTodo.id ? updatedTodo : t)),
          );
        })
        .catch(() => {
          setError('update');
        });
    });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}
      {/* Add a todo on form submit */}
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          addTodo(newTodo)
            .then(createdTodo => {
              setTodos(prev => [...prev, createdTodo]);
            })
            .catch(() => setError('add'));
          setNewTodo('');
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
      </form>
    </header>
  );
};
