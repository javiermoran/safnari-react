import { Type } from "./IType";

export interface ICollection {
  _id?: string;
  name: string;
  type: Type[] | string;
  parent?: string;
  breadcrumbs?: ICollection[];
  creator?: string;
  created?: number;
}
