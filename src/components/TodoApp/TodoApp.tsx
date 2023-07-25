/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoFooter } from '../TodoFooter';
import { TodoHeader } from '../TodoHeader';
import { TodoList } from '../TodoList';

export const TodoApp: React.FC = () => {
  const {
    todos,
    errorMessage,
  } = useContext(TodosContext);

  const isShowOnlyInput = todos.length === 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        {!isShowOnlyInput
          && (
            <>
              <TodoList />

              <TodoFooter />
            </>
          )}

        {errorMessage
          && (
            <div
              className="notification is-danger is-light has-text-weight-normal"
            >
              <button
                type="button"
                className="delete"
                onClick={event => event.currentTarget.parentElement?.classList.add('hidden')}
              />
              {errorMessage}
            </div>
          )}
      </div>
    </div>
  );
};
