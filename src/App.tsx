import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import Filter from './components/Filter';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo, Error } from './types/Todo';
import { ErrorFile } from './components/ErrorFile';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<Error | null>(null);

  const hideError = () => {
    setError(false);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (err) {
        setError(true);
        setErrorType('load');
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
    setError(true);
    setErrorType('delete');
    setTimeout(() => {
      hideError();
    }, 3000);
  };

  const handleSetFilter = (selected: 'all' | 'active' | 'completed') => {
    setFilter(selected);
  };

  const handleClearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  const remainingTodoCount = todos.filter(todo => !todo.completed).length;

  const handleEmpty = () => {
    setError(true);
    setErrorType('empty');
    setTimeout(() => {
      hideError();
    }, 3000);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo onAddTodo={handleAddTodo} handleEmpty={handleEmpty} />

        {todos.length > 0 && (
          <TodoList
            todos={todos}
            filter={filter}
            onDeleteTodo={handleDeleteTodo}
          />
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {remainingTodoCount}
              {remainingTodoCount === 1 ? ' item' : ' items'} left
            </span>
            {todos.length > 0 && (
              <Filter
                selectedFilter={filter}
                onSelectFilter={handleSetFilter}
              />
            )}
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

      {error && (
        <ErrorFile error={error} errorType={errorType} errorHide={hideError} />
      )}
    </div>
  );
};

export default App;
