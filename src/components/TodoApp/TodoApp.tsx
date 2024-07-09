import { useTodoApp } from './useTodoApp';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { TodoList } from '../TodoList';
import { Notification } from '../Notification';

export const TodoApp = () => {
  const {
    todos,
    error,
    filter,
    activeTodosQty,
    isFooterShown,
    clearError,
    onFilter,
  } = useTodoApp();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!todos.length && <TodoList todos={todos} />}

        {isFooterShown && (
          <Footer
            filter={filter}
            activeTodosQty={activeTodosQty}
            onFilter={onFilter}
          />
        )}
      </div>

      <Notification error={error} clearError={clearError} />
    </div>
  );
};
