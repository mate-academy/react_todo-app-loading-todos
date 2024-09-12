import { FC, FormEvent, useState } from 'react';
import { useTodos } from '../utils/TodosContext';
import { USER_ID } from '../api/todos';

export const TodoHeader: FC = () => {
  const { addTodo, setTodos, todos, isLoading } = useTodos();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query || isLoading) {
      return;
    }

    addTodo({
      id: Date.now(),
      title: query,
      completed: false,
      userId: USER_ID,
    });
    setQuery('');
  };

  const togleCompletedForAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={togleCompletedForAll}
      />

      <form name="todo-text" onSubmit={handleSubmit}>
        <input
          value={query}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
