/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  // useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
// import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { NewTodo } from './components/NewTodo';
import { getTodos } from './api/todos';
import { Todo, SortType } from './types/Todo';
import { Tab } from './types/Tab';

export const tabs:Tab[] = [
  { id: '1', title: SortType.ALL, link: '/' },
  { id: '2', title: SortType.ACTIVE, link: '/active' },
  { id: '3', title: SortType.COMPLETED, link: '/completed' },
];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  const selectedTab = tabs.find(tab => selectedTabId === tab.id) || tabs[0];

  const onTabSelected = (tab:Tab) => {
    setSelectedTabId(tab.id);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const user = useContext(AuthContext);

  const newTodoField = useRef<HTMLInputElement>(null);

  const loadTodos = async () => {
    const todosFromServer = await getTodos(9);

    setTodos(todosFromServer);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    loadTodos();
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const filteredTodos = todos
    .filter(({ completed }) => {
      switch (selectedTab.title) {
        case SortType.ACTIVE:
          return !completed;

        case SortType.COMPLETED:
          return completed;

        default:
          return true;
      }
    });

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

          <NewTodo
            newTodoField={newTodoField}
          />
        </header>

        <TodoList
          todos={filteredTodos}
          selectTodo={setTodoId}
          selectedTodoId={todoId}
        />

        <Footer
          tabs={tabs}
          selectedTabId={selectedTabId}
          onTabSelected={onTabSelected}
        />
      </div>

      <ErrorNotification />
    </div>
  );
};
