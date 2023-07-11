import { FC, useContext } from 'react';
import { TodoHeader } from './TodoContent/TodoHeader';
import { TodoMain } from './TodoContent/TodoMain';
import { TodoFooter } from './TodoContent/TodoFooter';
import { TodoContext } from './TodoContext';
import { ErrorNotification } from './ErrorNotification';

export const TodoApp: FC = () => {
  const {
    todosCount,
    error,
    onErrorChange,
  } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todosCount > 0 && (
          <>
            <TodoMain />
            <TodoFooter />
          </>
        )}
      </div>

      <ErrorNotification
        error={error}
        onHideError={() => onErrorChange(null)}
      />
    </div>
  );
};
