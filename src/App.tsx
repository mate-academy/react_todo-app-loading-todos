import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import Filter from './components/Filter';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (err) {
        setError('Error loading todos');
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = (title: string) => {
    setTimeout(() => {
      const newTodo: Todo = {
        id: todos.length + 1,
        userId: 0,
        title,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }, 500);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);

    setTodos(updatedTodos);
  };

  const handleSetFilter = (selected: 'all' | 'active' | 'completed') => {
    setFilter(selected);
  };

  const handleClearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  const remainingTodoCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo onAddTodo={handleAddTodo} />

        {todos.length > 0 && (
          <Filter selectedFilter={filter} onSelectFilter={handleSetFilter} />
        )}

        {todos.length > 0 && (
          <TodoList
            todos={todos}
            filter={filter}
            onDeleteTodo={handleDeleteTodo}
          />
        )}

        {error && (
          <div
            data-cy="ErrorNotification"
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              data-cy="HideErrorButton"
              type="button"
              className="delete"
            />
            {error}
          </div>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {remainingTodoCount}
              {remainingTodoCount === 1 ? 'item' : 'items'} left
            </span>
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;
