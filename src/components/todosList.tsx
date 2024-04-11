import { useContext } from 'react';
import { Todo } from '../types/Todo';
import { TodosItem } from './todosItem';
import { TodosContext } from './todosContext';

interface ListProps {
  items: Todo[];
}

export const TodosList: React.FC<ListProps> = ({ items }) => {
  const { todos } = useContext(TodosContext);

  const isListShown = () => {
    return todos.length > 0;
  };

  return (
    isListShown() === true && (
      <ul>
        {items.map(item => (
          <TodosItem key={item.id} item={item} />
        ))}
      </ul>
    )
  );
};
