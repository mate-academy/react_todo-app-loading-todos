import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';
import { FilterTypes } from './types/Filter';
import { Todo } from './types/Todo';

export function getFilteredTodo(
  todos: Todo[],
  selectedTab: FilterTypes,
) {
  const filterByType = todos.filter((todo) => {
    switch (selectedTab.id) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return todo;
    }
  });

  return filterByType;
}

export const tabs: FilterTypes[] = [
  { id: '', title: 'All' },
  { id: 'active', title: 'Active' },
  { id: 'completed', title: 'Completed' },
];

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [hideError, setHideError] = useState(false);
  const [selectedTabId, setTabID] = useState(tabs[0].id);
  const onTabSelected = (tab: FilterTypes) => {
    setTabID(tab.id);
  };

  const selectedTab = tabs.find(tab => tab.id === selectedTabId) || tabs[0];

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const todosFromServer = await getTodos(user?.id);

          setTodos(todosFromServer);
        }
      } catch (errorFromServer) {
        setError(`${errorFromServer}`);
      }
    };

    fetchData();
  }, []);

  const resultTodo = getFilteredTodo(todos, selectedTab);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            aria-label="ToggleAllButton"
            className="todoapp__toggle-all active"
          />

          <NewTodoForm newTodoField={newTodoField} />
        </header>
        {todos.length > 0
          && (
            <>
              <TodoList todos={resultTodo} />

              <Footer
                tabs={tabs}
                selectedTabId={selectedTabId}
                onTabSelected={onTabSelected}
                todos={todos}
              />
            </>
          )}

      </div>

      <ErrorMessage
        error={error}
        setHideError={setHideError}
        hideError={hideError}
        setError={setError}
      />
    </div>
  );
};
