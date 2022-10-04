import { IError } from './Error.interface';
import { EFilterBy } from './FilterBy.enum';
import { ILoader } from './Loader.interface';
import { ITodo } from './Todo.interface';
import { ITodoAnimation } from './TodoAnimation.interface';
import { IUser } from './User.interface';

export interface IState {
  user: IUser | null;
  todos: ITodo[];
  loaders: ILoader[];
  animations: ITodoAnimation[];
  error: IError;
  filterBy: EFilterBy;
}
