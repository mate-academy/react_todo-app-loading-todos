/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';

import { USER_ID } from './api/todos';
import { getFilteredTodos } from './utils/getFilteredTodos';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorsContainer } from './components/ErrorsContainer';

import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';
import { Main } from './components/Main';
import { useTodosContext } from './Context/TodosContext';

const tempTodo: Todo = {
  id: 0,
  userId: USER_ID,
  title: '',
  completed: false,
};

export const App: React.FC = () => {
  const { todos, errors, addTodoAndSubmit, deletingTodo, updatingTodo } =
    useTodosContext();
  const [todo, setTodo] = useState<Todo>(tempTodo);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = getFilteredTodos(todos, filter);

  const errorsCondition = errors.titleError || errors.loadingError;

  const handleChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleDeleteTodo = (todoId: number) => {
    deletingTodo(todoId);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    updatingTodo(updatedTodo);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    addTodoAndSubmit(e, todo, setTodo, tempTodo);
  };

  return (
    <div className={cn('todoapp', { 'has-error': errorsCondition })}>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodo={todo}
          submit={handleSubmit}
          changeTodo={handleChangeTodo}
        />
        <Main
          filteredTodos={filteredTodos}
          deleteTodo={handleDeleteTodo}
          updateTodo={handleUpdateTodo}
        />
        {todos.length !== 0 && (
          <Footer todos={todos} filterType={filter} setFilter={setFilter} />
        )}
      </div>
      <ErrorsContainer errorsCondition={errorsCondition} />
    </div>
  );
};
