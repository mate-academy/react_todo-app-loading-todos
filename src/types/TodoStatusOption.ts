export enum TodoStatusOptions {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const todoStatusOptions = Object.values(
  TodoStatusOptions,
) as TodoStatusOption[];

export type TodoStatusOption = `${TodoStatusOptions}`;
