import { Filter } from './Filter';
import { Notification } from './Notification';
import { Todo } from './Todo';

export interface State {
  todos: Todo[],
  filterType: Filter,
  notification: Notification,
}
