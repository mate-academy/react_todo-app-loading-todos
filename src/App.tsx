/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { UserWarning } from './UserWarning';
import { Filter } from './components/Filter/Filter';
import { TodoList } from './components/TodoList/TodoList';
import {
  TodoUpdateContext,
  TodosProvider,
} from './TodosContext/TodosContext';
import { InputForm } from './components/InputForm/InputForm';

export const USER_ID = 105;

export const AppContent: React.FC = () => {
  const { addTodo } = useContext(TodoUpdateContext);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <InputForm onSubmit={addTodo} />

        <TodoList />

        {/* Hide the footer if there are no todos */}
        <Filter />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <AppContent />
    </TodosProvider>
  );
};
