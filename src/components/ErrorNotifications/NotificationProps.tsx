import { Error } from '../../Error';

export type NotificationProps = {
  error: Error | null;
  setError: (title: Error | null) => void
};
