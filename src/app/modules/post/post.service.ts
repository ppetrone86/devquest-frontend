import { inject, Injectable } from '@angular/core';
import { PostModel, PostTagStatistics } from '@models/post.model';
import { ApiService } from '@services/api/api.service';
import { DummyProvider } from '@services/api/providers/dummy/dummy-provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService extends ApiService {
  protected provider = inject(DummyProvider);

  fetchAll(): Observable<any> {
    return this.provider.posts.fetchAll();
  }

  getPostTagStatistics(posts: PostModel[]): PostTagStatistics[] {
    const tagMap = new Map<string, { count: number }>();

    posts.forEach((post: PostModel) => {
      post.tags.forEach((tag) => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, { count: 0 });
        }

        tagMap.get(tag)!.count += 1;
      });
    });

    const totalTagOccurrences = Array.from(tagMap.values()).reduce((sum, tagData) => (sum += tagData.count), 0);
    const int = Math.trunc;

    return Array.from(tagMap.entries()).map(([tag, data]) => ({
      tag,
      count: data.count,
      percentage: int(totalTagOccurrences > 0 ? (data.count / totalTagOccurrences) * 100 : 0),
    }));
  }
}
