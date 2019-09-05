import { IType } from "./IType";

export interface ICollection {
  _id?: string;
  name: string;
  type: IType | string;
  parent?: string;
  breadcrumbs?: ICollection[];
  creator?: string;
  created?: number;
}
