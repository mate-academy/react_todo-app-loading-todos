import React, { useContext, useState, useEffect, useRef } from 'react';
import { Todo } from '../Todo/Todo';
import { Notification } from '../Notification/Notification';
import { TodoContext } from '../../contexts/TodoContext';
import { USER_ID, createTodo } from '../../api/todos';
import {
  FilterContext,
  ACTIONSINFILTERCONTEXT,
} from '../../contexts/FilterContext';
import { Filter } from '../Filter/Filter';

export const TodoApp: React.FC = () => {
  const { todosFromServer, refreshTodos, putErrorWarning } =
    useContext(TodoContext)!;
  const {
    filteredTodos,
    currentFilterCriteria,
    itemsLeft,
    totalCompletedTodos,
  } = useContext(FilterContext)!;
  const [showFooterOrNot, setShowFooterOrNot] = useState(false);
  const [textInFormToCreateTodo, settextInFormToCreateTodo] = useState('');
  const creatTodoRef = useRef<HTMLInputElement>(null);

  const hanldeInputValueFormCreateTodo = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    settextInFormToCreateTodo(event.target.value);
  };

  useEffect(() => {
    creatTodoRef.current?.focus();
  }, []);

  useEffect(() => {
    creatTodoRef.current?.focus();

    if (currentFilterCriteria !== ACTIONSINFILTERCONTEXT.ALL) {
      setShowFooterOrNot(true);

      return;
    }

    if (filteredTodos.length < 1) {
      setShowFooterOrNot(false);

      return;
    }

    setShowFooterOrNot(true);
  }, [filteredTodos, currentFilterCriteria]);

  const handleSubmitToCreateTodo = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!(textInFormToCreateTodo !== '')) {
      createTodo({
        title: textInFormToCreateTodo,
        userId: USER_ID,
        completed: false,
      }).then(res => {
        todosFromServer.push({ ...res, isAwaitServer: false });

        refreshTodos([...todosFromServer]);
        settextInFormToCreateTodo('');
      });
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {showFooterOrNot && (
            <button
              type="button"
              className={`todoapp__toggle-all ${itemsLeft || 'active'}`}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmitToCreateTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={creatTodoRef}
              onChange={hanldeInputValueFormCreateTodo}
              value={textInFormToCreateTodo}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <Todo
            todos={filteredTodos}
            refreshTodos={refreshTodos}
            setErrorMsg={putErrorWarning}
          />
        </section>

        {/* Hide the footer if there are no todos */}
        {showFooterOrNot && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${itemsLeft} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <Filter />

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!Boolean(totalCompletedTodos)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification />
    </div>
  );
};
