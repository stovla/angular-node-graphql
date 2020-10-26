import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import gql from 'graphql-tag';

const GET_POSTS = gql`
  {
    posts {
      posts {
        _id
        title
        content
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(postInput: { title: $title, content: $content }) {
      _id
      title
      content
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      _id
      title
      content
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  posts: Observable<any>;
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.posts = this.apollo.watchQuery({
      query: GET_POSTS
    }).valueChanges.pipe(
      map((result: any) => {
        return result.data.posts.posts;
      })
    );
  }
  createPost(title: string, content: string): void {
    this.apollo.mutate({
      mutation: CREATE_POST,
      refetchQueries: [{ query: GET_POSTS }],
      variables: {
        title,
        content
      }
    }).subscribe(() => {
      console.log('Created');
    });
  }

  delete(id: string): void {
    this.apollo.mutate({
      mutation: DELETE_POST,
      refetchQueries: [{ query: GET_POSTS }],
      variables: {
        id
      }
    }).subscribe(() => {
      console.log('deleted');
    });
  }


}
