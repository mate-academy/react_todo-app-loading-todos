/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NotifyComponent } from './components/notification/notify.component';
import { text } from './constants/text';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [customError, setCustomError] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<Status>('all');

  useEffect(() => {
    setCustomError('');
    getTodos()
      .then(setTodos)
      .catch(() => {
        setCustomError(text.unableToLoadTodos);
        const timerId = setTimeout(() => setCustomError(''), 3000);

        return () => clearTimeout(timerId);
      });
  }, []);

  const sortedTodoByStatus = useMemo(() => {
    return todos.filter(todo => {
      if (selectedStatus === 'completed') {
        return todo.completed;
      }

      if (selectedStatus === 'active') {
        return !todo.completed;
      }

      return todo;
    });
  }, [selectedStatus, todos]);

  const handleSelectTodo = (action: Status) => {
    setSelectedStatus(action);
  };

  const closeModal = () => {
    setCustomError('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">{text.todos}</h1>
      <HeaderComponent />

      <div className="todoapp__content">
        <TodoListComponent todos={sortedTodoByStatus} />
        {/* Hide the footer if there are no todos */}
        <FooterComponent
          todos={todos}
          handleSelectTodo={handleSelectTodo}
          selectedStatus={selectedStatus}
        />
      </div>

      <NotifyComponent errorMessage={customError} closeModal={closeModal} />
    </div>
  );
};
