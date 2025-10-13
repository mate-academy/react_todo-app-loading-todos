import { Todo } from '../../types/Todo';
import React, { useEffect, useState } from 'react';
import { TodosList } from '../../components/TodoList/TodoList';
import { getTodos as getUserTodos } from '../../api/todos';
import { TodoFooter } from '../TodoFooter/TodoFooter';
import { Loader } from '../Loader/Loader';
import { FilterType } from '../../types/FilterType';

type UserTodosProp = {
  userId: number;
};

export const UserTodos: React.FC<UserTodosProp> = ({
  userId,
}: {
  userId: number;
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const activeTodo = todos.filter(t => !t.completed).length;

  //Unable to load todos
  //  Title should not be empty
  //  Unable to add a todo
  //  Unable to delete a todo
  //  Unable to update a todo
  function visibleTodos() {
    switch (filter) {
      case FilterType.Active:
        return todos.filter(todo => !todo.completed);
      case FilterType.Completed:
        return todos.filter(todo => todo.completed);
      case FilterType.All:
      default:
        return todos;
    }
  }

  function loadTodos() {
    setLoading(true);
    setErrorMessage('');
    setIsErrorVisible(false);
    getUserTodos(userId)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsErrorVisible(true);
        setTimeout(() => setIsErrorVisible(false), 3000);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadTodos, [userId]);

  return (
    <div className="box">
      {loading && <Loader />}

      {todos.length === 0 && <p>There are no todos yet!</p>}

      {todos.length > 0 && (
        <TodosList
          todos={visibleTodos()}
          selectedTodoId={selectedTodo?.id}
          onSelect={setSelectedTodo}
        />
      )}

      {todos.length > 0 && (
        <TodoFooter
          todosCountActive={activeTodo}
          filter={filter}
          onChangeFilter={setFilter}
          canClearCompleted={todos.some(t => t.completed)}
          onClearCompleted={() => {
            setTodos(todos.filter(t => !t.completed));
            if (selectedTodo?.completed) {
              setSelectedTodo(null);
            }
          }}
        />
      )}

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        className={
          isErrorVisible
            ? 'notification is-danger is-light has-text-weight-normal'
            : 'notification is-danger is-light has-text-weight-normal hidden'
        }
        data-cy="ErrorNotification"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsErrorVisible(false)}
        />
        {errorMessage}
        <br />
      </div>
    </div>
  );
};
