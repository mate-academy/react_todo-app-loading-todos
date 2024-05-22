/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import cn from 'classnames';

import { getFilteredTodos } from './utils/getFilteredTodos';

import { useTodosContext } from './context/TodosContext';

import { ErrorsContainer } from './components/ErrorsContainer/ErrorsContainer';
import { TodoItem } from './components/TodoItem';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { Status } from './types/Status';

export const App = () => {
  const { todos, errorMessage, tempTodo, loadingIds } = useTodosContext();
  const [status, setStatus] = useState<Status>(Status.All);

  const filteredTodos = getFilteredTodos(todos, status);

  const isClearAllCompletedActive = filteredTodos.some(
    someTodo => someTodo.completed,
  );

  return (
    <div className={cn('todoapp', { 'has-error': errorMessage })}>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem todo={todo} key={todo.id} loadingIds={loadingIds} />
          ))}

          {tempTodo && <TodoItem loadingIds={loadingIds} todo={tempTodo} />}
        </section>

        {!!todos.length && (
          <Footer
            status={status}
            setStatus={setStatus}
            isClearAllCompletedActive={isClearAllCompletedActive}
          />
        )}
      </div>

      <ErrorsContainer />
    </div>
  );
};
