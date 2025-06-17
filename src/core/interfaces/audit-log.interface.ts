import { IRequestOptions } from './request-options.interface';

export interface IAuditLog extends IRequestOptions {
  accessById?: string;
  resId?: string;
  resIds?: string;
  accessType?:
    | 'create'
    | 'update'
    | 'delete'
    | 'restore'
    | 'archive'
    | 'find'
    | 'read'
    | 'list'
    | 'logout'
    | 'synchronization'
    | 'paginate';
  status?: string;
}
