import { TodoHeader } from './TodoHeader';
import { TodoFooter } from './TodoFooter';
import { TodoList } from './TodoList';

export const TodoContent = () => {
  return (
    <div className="todoapp__content">
      <TodoHeader />

      <TodoList />

      <TodoFooter />
    </div>
  );
};
