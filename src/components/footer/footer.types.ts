import { Status } from '../../types/Status';

export type FooterTypes = {
  handleSelectTodo: (action: Status) => void;
  selectedStatus: Status;
};
