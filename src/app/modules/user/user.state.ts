import { UserModel } from '@models/user.model';

export interface UserState {
  users: UserModel[];
  total: number;
  filters: Record<string, any>;
  sortField: string;
  sortOrder: string;
  loaded: boolean;
}
