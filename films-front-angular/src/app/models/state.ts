import { User } from '../models/user';
import { Film } from '../models/film';

export interface State {
  readonly user: User;
  readonly film: Array<Film>;
}