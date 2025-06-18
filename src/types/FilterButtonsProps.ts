import { FilterStatus } from '../types/TodoListProps';

export interface FilterButtonsProps {
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
}
