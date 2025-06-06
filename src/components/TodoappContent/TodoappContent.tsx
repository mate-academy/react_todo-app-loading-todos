import { useEffect, useState } from 'react';
import { TodoappFooter } from '../TodoappFooter';
import { TodoappHeader } from '../TodoappHeader';
import { TodoappMain } from '../TodoappMain';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/Filter';
import { getTodos } from '../../api/todos';
interface TodoappContentProps {
  setErrorNotification: (msg: string) => void;
}

export const TodoappContent: React.FC<TodoappContentProps> = ({
  setErrorNotification,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStyle, setFilterStyle] = useState<FilterType>('all');

  useEffect(() => {
    getTodos()
      .then(data => {
        const newData = data.map(todo => ({ ...todo, isLoaded: true }));

        setTodos(newData);
      })
      .catch(() => setErrorNotification('Unable to load todos'));
  }, [setErrorNotification]);

  const filteredTodos = todos.filter(todo => {
    switch (filterStyle) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  });

  const handleClearCompletedButton = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp__content">
      <TodoappHeader
        setTodos={setTodos}
        todos={todos}
        setErrorNotification={setErrorNotification}
      />

      <TodoappMain
        todos={filteredTodos}
        setTodos={setTodos}
        setErrorNotification={setErrorNotification}
      />

      <TodoappFooter
        todos={todos}
        setFilterStyle={setFilterStyle}
        handleClearCompletedButton={handleClearCompletedButton}
      />
    </div>
  );
};
