import { useEffect, useState } from 'react';

import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterOptions } from './types/FilterOptions';
import { ErrorOptions } from './types/ErrorOptions';

import UserWarning from './UserWarning';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import TodoError from './components/TodoError';

type OptionsParams = {
  filterOption: FilterOptions;
};

function getFilteredTodos(todos: Todo[], options: OptionsParams) {
  let copyTodos = [...todos];

  switch (options.filterOption) {
    case FilterOptions.ACTIVE:
      copyTodos = copyTodos.filter(todo => !todo.completed);
      break;
    case FilterOptions.COMPLETED:
      copyTodos = copyTodos.filter(todo => todo.completed);
      break;
    case FilterOptions.ALL:
      break;
  }

  return copyTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState(FilterOptions.ALL);
  const [errorOption, setErrorOption] = useState(ErrorOptions.NONE);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorOption(ErrorOptions.LOAD));
  }, []);

  const filteredTodos = getFilteredTodos(todos, { filterOption });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />
        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterOption={filterOption}
            onFilter={setFilterOption}
          />
        )}
      </div>

      <TodoError errorOption={errorOption} onError={setErrorOption} />
    </div>
  );
};
