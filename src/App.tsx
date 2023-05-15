import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { TodoAppHeader } from './components/TodoAppHeader/TodoAppHeader';
import { TodoAppContent } from './components/TodoAppContent/TodoAppContent';
import { TodoAppFooter } from './components/TodoAppFooter/TodoAppFooter';
import { Notifications } from './components/Notifications/Notifications';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { ErrorType } from './types/ErrorType';

const USER_ID = 10308;

const getTodos = () => client.get<Todo[]>(`/todos?userId=${USER_ID}`);

const prepareTodos = (todoList: Todo[], filterType: FilterType) => (
  todoList.filter(todo => {
    switch (filterType) {
      case FilterType.ACTIVE:
        return !todo.completed;

      case FilterType.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  })
);

const getActiveTodosCount = (todoList: Todo[]) => (
  todoList.filter(todo => !todo.completed).length || 0
);

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [errorType] = useState(ErrorType.NONE);

  const getTodoList = useCallback(async () => {
    const todos = await getTodos();

    setTodoList(todos);
  }, []);

  const preparedTodos = useMemo(() => (
    prepareTodos(todoList || [], filterType)
  ), [todoList, filterType]);

  const activeTodosCount = useMemo(() => (
    getActiveTodosCount(todoList || [])
  ), [todoList]);

  const areCompletedTodos = todoList
    ? activeTodosCount < todoList.length
    : false;

  const handleFilterChange = (newFilterType: FilterType) => {
    setFilterType(newFilterType);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoAppHeader activeTodosCount={activeTodosCount} />

        {preparedTodos && (
          <>
            <TodoAppContent todoList={preparedTodos} />

            <TodoAppFooter
              filterType={filterType}
              activeTodosCount={activeTodosCount}
              areCompletedTodos={areCompletedTodos}
              onFilterChange={handleFilterChange}
            />
          </>
        )}
      </div>

      <Notifications errorType={errorType} />
    </div>
  );
};
