import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostTagStatistics } from '@models/post.model';
import { selectorPostState_posts } from '@modules/post/post.selectors';
import { PostService } from '@modules/post/post.service';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Card } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { map } from 'rxjs';

@Component({
  selector: 'app-tag-table',
  imports: [TableModule, ProgressBarModule, TranslateModule, Card],
  templateUrl: './post-table.component.html',
  standalone: true,
})
export class PostTableComponent {
  private _store: Store = inject(Store);
  private _postService: PostService = inject(PostService);

  tagData: Signal<PostTagStatistics[]> = toSignal(
    this._store.select(selectorPostState_posts).pipe(map((posts) => this._postService.getPostTagStatistics(posts))),
    { initialValue: [] }
  );
}
