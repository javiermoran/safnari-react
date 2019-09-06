import { IType } from './IType';
import { ICollection } from './ICollection';

export interface IItem {
  _id?: string;
  title: string;
  number?: number;
  publisher?: string;
  artist?: string;
  format?: string;
  picture?: string;
  created?: number;
  type?: IType | string;
  creator?: string;
  coll: ICollection | string;
  status?: string;
}
