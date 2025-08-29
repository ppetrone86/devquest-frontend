import { inject, Injectable } from '@angular/core';
import { SectionModel } from '@models/section.model';
import { UserModel } from '@models/user.model';
import { ApiService } from '@services/api/api.service';
import { DummyProvider } from '@services/api/providers/dummy/dummy-provider';

import { DevQuestProvider } from '@services/api/providers/dev-quest/dev-quest-provider.service';
import { LogService } from '@services/log.service';
import { Observable } from 'rxjs';

interface UserApiResponse {
  users: UserModel[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  protected provider = inject(DevQuestProvider);
  protected dummyProvider = inject(DummyProvider);

  /**
   * Fetches a list of users with optional query parameters.
   * @param filters Optional query parameters.
   * @param sortField Field to sort by.
   * @param sortOrder Sorting direction ('asc' or 'desc').
   * @returns An Observable containing a list of users and the total count.
   */
  fetchUsers(
    filters?: Record<string, string | number>,
    sortField?: string,
    sortOrder?: string
  ): Observable<UserApiResponse> {
    LogService.debug('UserService.fetchUsers.filters', filters);
    const sortParams = sortField && sortOrder ? { sortBy: sortField, order: sortOrder } : undefined;
    return this.dummyProvider.users.fetchAll<UserApiResponse>(filters, sortParams);
  }

  /**
   * Get user by ID
   * @param id
   * @returns UserModel
   */
  getUserById(id: number): Observable<UserModel> {
    return this.dummyProvider.users.fetchById<UserModel>(id);
  }

  /**
   * Gets the details of the currently authenticated user.
   * @returns An Observable containing the user details and the sections they have access to.
   */
  getUserDetails(): Observable<{ user: UserModel; sections: SectionModel[] }> {
    return this.provider.user.details();
  }

  /**
   * Flattens a list of sections into a list of permissions.
   * @param sections The list of sections to flatten.
   * @param prefix The prefix to prepend to each permission.
   * @returns A list of permissions.
   */
  static flattenSections = (sections: SectionModel[], prefix = ''): string[] => {
    const permissions: string[] = [];
    for (const section of sections) {
      const id = `${prefix}${section.id}.`;
      for (const operation of section.operations) {
        permissions.push(`${id}${operation}`);
      }
      permissions.push(...UserService.flattenSections(section.sections, id));
    }
    return permissions;
  };
}
