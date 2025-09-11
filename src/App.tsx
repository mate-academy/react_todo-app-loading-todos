/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { FilterType, Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const getAllTodos = async () => {
    try {
      const allTodos = await getTodos();

      setTodos(allTodos);
    } catch {
      setErrorMessage('Unable to load todos');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const TodosFilter = (filterBy: FilterType): Todo[] => {
    switch (filterBy) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
    }
  };

  const filteredTodos = TodosFilter(filterType);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList filteredTodos={filteredTodos} />
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length && (
          <Footer
            itemsLeft={itemsLeft}
            filterType={filterType}
            onFilterClick={setFilterType}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onHideErrorButtonClick={setErrorMessage}
      />
    </div>
  );
};
