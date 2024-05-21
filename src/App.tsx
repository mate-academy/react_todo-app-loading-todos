/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { FilterBy } from './utils/FilterBy';
import { ErrorMessage } from './components/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [emptyTitle, setEmptyTitle] = useState(false);

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setFilteredTodos(data);
    });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const applyFilter = (filt: string, todosArr: Todo[]) => {
    setFilteredTodos(FilterBy(filt, todosArr));
  };

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    applyFilter(newFilter, todos);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
    applyFilter(filter, updatedTodos);
  };

  const handleShowError = () => {
    setEmptyTitle(true);

    setTimeout(() => {
      setEmptyTitle(false);
    }, 4000);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim()) {
      const newTodo: Todo = {
        id: todos.length + 1,
        title: query,
        completed: false,
        userId: USER_ID,
      };

      const updatedTodos = [...todos, newTodo];

      setTodos(updatedTodos);
      setQuery('');
      applyFilter(filter, updatedTodos);
    } else {
      handleShowError();
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          handleAddTodo={handleAddTodo}
          handleQueryChange={handleQueryChange}
          query={query}
          todos={todos}
        />

        <TodoList todos={filteredTodos} handleToggleTodo={handleToggleTodo} />

        {!!todos.length && (
          <Footer
            filter={filter}
            handleFilterChange={handleFilterChange}
            todos={todos}
          />
        )}
      </div>
      <ErrorMessage emptyTitle={emptyTitle} setEmptyTitle={setEmptyTitle} />
    </div>
  );
};
