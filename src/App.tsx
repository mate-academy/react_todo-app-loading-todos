/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { Todo } from './types/Todo';
import { FilterState } from './types/FilterStates';
import { MESSAGE } from './const';

const getFilteredTodo = (todos: Todo[], query: FilterState): Todo[] => {
  if (query === 'All') {
    return todos;
  }

  return todos.filter(todo => todo.completed === (query === 'Completed'));
};

export const App: React.FC = () => {
  const [isLoadint, setIsLoadig] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [filterState, setFilterState] = React.useState<FilterState>('All');
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>([]);

  useEffect(() => {
    setIsLoadig(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(MESSAGE.UNABLE_LOAD))
      .finally(() => setIsLoadig(false));
  }, []);

  useEffect(() => {
    setFilteredTodos(getFilteredTodo(todos, filterState));
  }, [filterState, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const itemsLeft = filteredTodos.filter(
    todo => todo.completed === false,
  ).length;

  const onChange = (todo: Todo, fieldsToUpdate: Partial<Todo>) => {
    const updatedTodo = { ...todo, ...fieldsToUpdate };
    const updatedTodos = [...todos];
    const index = todos.findIndex(
      currentTodo => currentTodo.id === updatedTodo.id,
    );

    updatedTodos.splice(index, 1, updatedTodo);
    setTodos(updatedTodos);
    setFilteredTodos(getFilteredTodo(updatedTodos, filterState));
  };

  const onDelete = (todoId: Todo['id']) => {
    const updatedTodos = [...todos];
    const index = todos.findIndex(currentTodo => currentTodo.id === todoId);

    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setFilteredTodos(getFilteredTodo(updatedTodos, filterState));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList
          isLoadint={isLoadint}
          todos={filteredTodos}
          onChange={onChange}
          onDelete={onDelete}
        />
        <Footer
          itemsLeft={itemsLeft}
          filterState={filterState}
          onFilter={setFilterState}
        />
      </div>

      <Notification errorMessage={errorMessage} />
    </div>
  );
};
