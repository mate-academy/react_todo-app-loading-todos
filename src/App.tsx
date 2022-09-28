/* eslint-disable jsx-a11y/control-has-associated-label */
// import React, { useContext, useEffect, useRef, useState } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { getTodos } from './api/todos';
// import { AuthContext } from './components/Auth/AuthContext';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export function getFilteredTodo(
  todos: Todo[],
  selectedTab: TabTypes,
) {
  const filterByType = todos.filter((todo) => {
    switch (selectedTab.id) {
      case 'active':
        return todo.completed === false;

      case 'completed':
        return todo.completed === true;

      default:
        return todo;
    }
  });

  return filterByType;
}

interface TabTypes {
  id: string,
  title: string,
}

export const tabs: TabTypes[] = [
  { id: '', title: 'All' },
  { id: 'active', title: 'Active' },
  { id: 'completed', title: 'Completed' },
];

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [hideError, setHideError] = useState(false);
  const [selectedTabId, setTabID] = useState(tabs[0].id);
  const onTabSelected = (tab: TabTypes) => {
    setTabID(tab.id);
  };

  const selectedTab = tabs.find(tab => tab.id === selectedTabId) || tabs[0];

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosFromServer = await getTodos(1);

        setTodos(todosFromServer);
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
            className="todoapp__toggle-all active"
          />

          <Form newTodoField={newTodoField} />
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
        setHideError={(value) => setHideError(value)}
        hideError={hideError}
        setError={(value) => setError(value)}
      />
    </div>
  );
};
