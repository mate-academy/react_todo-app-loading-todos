/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';

import { USER_ID, addTodo, deleteTodo, updateTodo } from './api/todos';
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
  const { todos, setTodos, errors, triggerError } = useTodosContext();
  const [todo, setTodo] = useState<Todo>(tempTodo);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [todoLoadingId, setTodoLoadingId] = useState<number | null>(null);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = getFilteredTodos(todos, filter);

  const errorsCondition = errors.titleError || errors.loadingError;

  const handleDeleteTodo = (todoId: number) => {
    setTodoLoadingId(todoId);
    setTimeout(() => {
      deleteTodo(todoId)
        .catch(() => {
          triggerError('deleteTodoError');
        })
        .finally(() => setTodoLoadingId(null));
      setTodos(currentTodos =>
        currentTodos.filter(todoDeleted => todoDeleted.id !== todoId),
      );
    }, 300);
  };

  const handleChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodoLoadingId(updatedTodo.id);
    updateTodo(updatedTodo)
      .then(todoUpdated => {
        setTodos(currentTodos => {
          const newTodos = [...currentTodos];
          const index = newTodos.findIndex(
            todoIndex => todoIndex.id === updatedTodo.id,
          );

          newTodos.splice(index, 1, todoUpdated);

          return newTodos;
        });
      })
      .catch(() => {
        triggerError('updateTodoError');
      })
      .finally(() => setTodoLoadingId(null));
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.title.trim()) {
      triggerError('titleError');

      return;
    }

    // setTodoLoadingId(todo.id);
    addTodo(todo)
      .then(newTodo => {
        setTodoLoadingId(newTodo.id);
        setTodos(prev => [...prev, newTodo]);
        setTodo(tempTodo);
      })
      .catch(() => {
        triggerError('addTodoError');
      })
      .finally(() =>
        setTimeout(() => {
          setTodoLoadingId(null);
        }, 300),
      );
  };

  window.console.log(todos, 'Rendered');

  return (
    <div className={cn('todoapp', { 'has-error': errorsCondition })}>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodo={todo}
          submit={handleSubmitForm}
          changeTodo={handleChangeTodo}
        />

        <Main
          filteredTodos={filteredTodos}
          isLoadingTodoId={todoLoadingId}
          deleteTodo={handleDeleteTodo}
          updateTodo={handleUpdateTodo}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer todos={todos} filterType={filter} setFilter={setFilter} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorsContainer errorsCondition={errorsCondition} />
    </div>
  );
};
