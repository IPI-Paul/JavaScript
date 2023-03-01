import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from "src/app/interfaces/post.interface";
import { PostsService } from "src/app/services/posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponnent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the second post\'s content'},
  //   {title: 'Third Post', content: 'This is the third post\'s content'},
  // ];
  posts: Post[] = [];
  private postsSub!: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPosUpdateListener().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}