import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { ErrorMessage } from './types/ErrorMessage';
import { getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { Error } from './components/Error';

const USER_ID = 10317;

function filterTodos(todos: Todo[], selectedFilter: TodoStatus): Todo[] {
  return todos.filter((todo) => {
    switch (selectedFilter) {
      case TodoStatus.All:
        return true;

      case TodoStatus.Active:
        return !todo.completed;

      case TodoStatus.Completed:
        return todo.completed;

      default:
        return true;
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(TodoStatus.All);
  const [errorType, setErrorType] = useState(ErrorMessage.None);
  const [isErrorShown, setIsErrorShown] = useState(false);

  const loadTodos = async () => {
    const todosFromServer = await getTodos(USER_ID);

    try {
      setTodos(todosFromServer);
    } catch {
      setErrorType(ErrorMessage.Download);
      setIsErrorShown(true);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const counterActiveTodos = useMemo(
    () => todos.reduce((num, todo) => {
      return todo.completed ? num : num + 1;
    }, 0),
    [todos],
  );

  const counterCompletedTodos = todos.length - counterActiveTodos;

  const filteredTodos = useMemo(() => (
    filterTodos(todos, selectedFilter)
  ), [selectedFilter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header countActiveTodos={counterActiveTodos} />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Filter
            countActiveTodos={counterActiveTodos}
            countCompletedTodos={counterCompletedTodos}
            selectedFilter={selectedFilter}
            onFilterSelect={setSelectedFilter}
          />
        )}

        <Error
          errorMessage={errorType}
          isError={isErrorShown}
          onClose={() => setIsErrorShown(false)}
        />
      </div>
    </div>
  );
};
