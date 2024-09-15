import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import * as todoService from '../../api/todos';
import { TodoList } from '../TodoList/TodoList';
import { TodoForm } from '../TodoForm/TodoForm';
import { TodoFooter } from '../TodoFooter/TodoFooter';

type FilterType = 'All' | 'Active' | 'Completed';

type Props = {
  userId: number;
  onError: (message: string) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const UserTodos: React.FC<Props> = ({
  userId,
  onError,
  todos,
  setTodos,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterType>('All');

  useEffect(() => {
    const loadTodos = () => {
      getTodos()
        .then(setTodos)
        .catch(() => onError('Unable to load todos'));
    };

    loadTodos();
  }, [onError, setTodos]);

  const addTodo = ({ title, completed = false }: Todo) => {
    if (title.length === 0) {
      return Promise.resolve();
    }

    return todoService
      .createTodo({ userId, title, completed })
      .then(newTodo => setTodos([...todos, newTodo]))
      .catch(() => onError('Unable to add a todo'));
  };

  const updateTodo = (updatedTodo: Todo) => {
    return todoService
      .updateTodo(updatedTodo)
      .then(todo => {
        const updatedTodos = todos.map(currentTodo =>
          currentTodo.id === updatedTodo.id ? todo : currentTodo,
        ) as Todo[];

        setTodos(updatedTodos);
      })
      .catch(() => onError('Unable to update a todo'));
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos?.filter(todo => todo.id !== todoId));

    return todoService.deleteTodo(todoId).catch(() => {
      setTodos(todos);
      onError('Unable to delete a todo');
    });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') {
      return true;
    }

    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return false;
  });

  const isNoCompletedTodos =
    filteredTodos.filter(todo => todo.completed).length <= 0;

  const clearCompleted = () => {
    const completedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    Promise.all(
      completedTodoIds.map(completedTodoId =>
        todoService.deleteTodo(completedTodoId),
      ),
    )
      .then(() => {
        setTodos(todos.filter(todo => !todo.completed));
      })
      .catch(() => onError('Unable to clear completed todos'));
  };

  const makeAllTodosCompleted = () => {
    const isAllCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !isAllCompleted,
    }));

    Promise.all(updatedTodos.map(todo => todoService.updateTodo(todo)))
      .then(() => setTodos(updatedTodos))
      .catch(() => onError('Unable to toggle all todos'));
  };

  return (
    <div className="todoapp__content">
      <TodoForm
        onSubmit={addTodo}
        makeAllTodosCompleted={makeAllTodosCompleted}
        isCompletedTodos={!isNoCompletedTodos}
      />
      <TodoList
        key={selectedTodo?.id}
        todos={filteredTodos}
        selectedTodo={selectedTodo}
        onDelete={deleteTodo}
        onEdit={setSelectedTodo}
        onSubmit={updateTodo}
      />
      {todos.length !== 0 && (
        <TodoFooter
          todos={todos}
          isNoCompletedTodos={isNoCompletedTodos}
          clearCompleted={clearCompleted}
          selectedFilter={filter}
          onFilterChange={setFilter}
        />
      )}
    </div>
  );
};
