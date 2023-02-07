import { Todo } from '../../types/Todo';
import { Footer } from '../TodoFooter';
import { Header } from '../TodoHeader';
import { TodoMain } from '../TodoMain';

export const TodoContent: React.FC<{ todos: Todo[] | null }> = ({ todos }) => {
  return (
    <div className="todoapp__content">
      <Header />
      <TodoMain todos={todos} />
      {todos && <Footer />}
    </div>
  );
};
