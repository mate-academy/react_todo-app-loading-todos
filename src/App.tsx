/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Filter, Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoMain } from './components/TodoMain/TodoMain';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoError } from './components/TodoError/TodoError';

function filterTodosByStatus(todos: Todo[], status: Filter) {
  let todosCopy = [...todos];

  switch (status) {
    case 'active': {
      todosCopy = todosCopy.filter(todo => !todo.completed);
      break;
    }

    case 'completed': {
      todosCopy = todosCopy.filter(todo => todo.completed);
      break;
    }

    default: {
      break;
    }
  }

  return todosCopy;
}

export const App: React.FC = () => {
  const [baseTodo, setBaseTodo] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(Filter.ALL);
  const [error, setError] = useState('');

  const todos = filterTodosByStatus(baseTodo, filterStatus);

  useEffect(() => {
    getTodos().then(todo => {
      setBaseTodo(todo);
    }).catch(() => setError('Invalid url link'));
  }, []);

  const countTodoActive = baseTodo
    .filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader countTodoActive={countTodoActive} />

        <TodoMain todos={todos} />

        <TodoFooter
          countTodoActive={countTodoActive}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>

      {error
      && <TodoError error={error} />}
    </div>
  );
};
