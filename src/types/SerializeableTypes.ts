export type SerializableValue =
  | string
  | number
  | boolean
  | null
  | SerializableObject
  | SerializableArray;
export type SerializableObject = { [key: string]: SerializableValue };
export type SerializableArray = SerializableValue[];
