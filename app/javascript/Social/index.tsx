import React, { useEffect, useState } from "react";
import { Post, PostComment, PostData, User } from "../types/models";
import PostDisplay from "./PostDisplay";
import { apiCall } from "../utils/helpers";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import Select from "../common/Select";
import PostCommentsModal from "./PostCommentsModal";
import DraftPostModal from "./DraftPostModal";

type PostFilter = 'all' | 'following' | 'mine';
type PostFeedState = {
  filter: PostFilter;
  page: number;
}

export type DraftPost = {
  body: string;
  imageUrls?: string[];
}

const emptyDraftPost = { body: '' };

type Props = {
  current_user: User;
  current_user_profile_picture_url?: string;
};

const Social = (props: Props) => {
  const [postDatas, setPostDatas] = useState<PostData[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const [postFeedState, setPostFeedState] = useState<PostFeedState>({
    filter: 'all',
    page: 1
  });
  const [postCommentsModalVisible, setPostCommentsModalVisible] = useState(false);
  const [commentModalPost, setCommentModalPost] = useState<Post | null>(null);
  const [commentModalPostComments, setCommentModalPostComments] = useState<PostComment[]>([]);
  const [draftPostModalVisible, setDraftPostModalVisible] = useState(false);
  const [draftPost, setDraftPost] = useState<DraftPost>(emptyDraftPost);

  const postsPerPage = 10;

  async function getPosts(page: number, filter: string): Promise<PostData[]> {
    return apiCall({
      method: 'GET',
      endpoint: '/social/posts',
      urlParams: {
        page: page,
        per_page: postsPerPage,
        filter: filter
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);
        return body.posts;
      });
  }

  async function reactToPost(postId: number, reaction: string, toggle: boolean) {
    apiCall({
      method: 'POST',
      endpoint: '/social/posts/'+postId+'/reactions',
      urlParams: {
        reaction: reaction,
        toggle: toggle
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        setPostDatas(postDatas.map((postData) => {
          if (postData.post.id !== postId) return postData;
          return {
            ...postData,
            post_reactions: body.post_reactions,
            current_user_reactions: body.current_user_reactions
          };
        }));
      });
  }

  async function reactToPostComment(postId: number, postCommentId: number, reaction: string, toggle: boolean) {
    apiCall({
      method: 'POST',
      endpoint: '/social/posts/'+postId+'/post_comments/'+postCommentId+'/reactions',
      urlParams: {
        reaction: reaction,
        toggle: toggle
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        setPostDatas(postDatas.map((postData) => {
          if (postData.post.id !== postId) return postData;
          return {
            ...postData,
            post_comments: postData.post_comments.map((postComment) => {
              if (postComment.id !== postCommentId) return postComment;
              return {
                ...postComment,
                post_comment_reactions: body.post_comment_reactions,
                current_user_reactions: body.current_user_reactions
              };
            })
          };
        }));

        setCommentModalPostComments(
          commentModalPostComments.map((postComment) => {
            if (postComment.id !== postCommentId) return postComment;
            return {
              ...postComment,
              post_comment_reactions: body.post_comment_reactions,
              current_user_reactions: body.current_user_reactions
            };
          })
        );
      });
  }

  async function submitComment(postId: number, body: string) {
    apiCall({
      method: 'POST',
      endpoint: '/social/posts/'+postId+'/post_comments',
      body: {
        body: body
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        setPostDatas(postDatas.map((postData) => {
          if (postData.post.id !== postId) return postData;
          return {
            ...postData,
            post_comments: body.post_comments
          };
        }));

        setCommentModalPostComments(body.post_comments);
      });
  }

  async function submitPost(draftPost: DraftPost) {
    apiCall({
      method: 'POST',
      endpoint: '/social/posts',
      body: {
        body: draftPost.body,
        image_urls: draftPost.imageUrls
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);
        if (['following'].includes(postFeedState.filter)) return;

        setPostDatas([body.post].concat(postDatas));
        setDraftPostModalVisible(false);
        setDraftPost(emptyDraftPost);
      });
  }

  function viewComments(post: Post, postComments: PostComment[]) {
    setCommentModalPost(post);
    setCommentModalPostComments(postComments);
    setPostCommentsModalVisible(true);
  }

  useEffect(() => {
    (async () => {
      setIsLoadingPosts(true);
      const newPostDatas = await getPosts(postFeedState.page, postFeedState.filter);
      if (postFeedState.page === 1) {
        setPostDatas(newPostDatas);
      } else {
        setPostDatas(postDatas.concat(newPostDatas));
      }
      setNoMorePosts(newPostDatas.length < postsPerPage);
      setIsLoadingPosts(false);
    })();
  }, [postFeedState]);

  return (
    <div id='social-index' className='px-6 py-8 max-w-[600px] mx-auto text-center'>
      <div className='text-2xl text-center mb-5'>
        Social
      </div>

      <div className='flex mb-5'>
        <div className='flex-1 text-left'>
          <Select
            value={postFeedState.filter}
            onChange={e => setPostFeedState({ ...postFeedState, filter: e.target.value as PostFilter, page: 1 })}
            className='max-w-[200px]'>
              <option value='all'>All Posts</option>
              <option value='following'>Following</option>
              <option value='mine'>My Posts</option>
          </Select>
        </div>
        <div className='flex-1 text-right'>
          {props.current_user &&
            <Button onClick={() => setDraftPostModalVisible(true)}>
              <FontAwesomeIcon
                icon={byPrefixAndName.fas['pen-to-square']}
                className='mr-1' />
              Post
            </Button>
          }
        </div>
      </div>

      {props.current_user &&
        <DraftPostModal
          visible={draftPostModalVisible}
          currentUser={props.current_user}
          currentUserProfilePictureUrl={props.current_user_profile_picture_url}
          draftPost={draftPost}
          onClose={() => setDraftPostModalVisible(false)}
          submitPost={submitPost} />
      }

      {commentModalPost &&
        <PostCommentsModal
          visible={postCommentsModalVisible}
          onClose={() => setPostCommentsModalVisible(false)}
          isLoggedIn={!!props.current_user}
          post={commentModalPost}
          postComments={commentModalPostComments}
          reactToPostComment={reactToPostComment}
          submitComment={submitComment} />
      }

      {postDatas.map((postData) => (
        <PostDisplay
          key={postData.post.id}
          postData={postData}
          isLoggedIn={!!props.current_user}
          reactToPost={reactToPost}
          viewComments={() => viewComments(postData.post, postData.post_comments)}
          className='mb-5' />
      ))}

      {isLoadingPosts &&
        <FontAwesomeIcon
          icon={byPrefixAndName.fas['circle-notch']}
          className='my-3 fa-2x fa-spin' />
      }

      {!isLoadingPosts && !noMorePosts &&
        <Button
          onClick={() => setPostFeedState({ ...postFeedState, page: postFeedState.page + 1 })}>
          Load More
        </Button>
      }
    </div>
  );
};

export default Social;
