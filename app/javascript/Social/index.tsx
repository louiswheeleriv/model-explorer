import React, { useEffect, useState } from "react";
import { Post, PostComment, PostData, PostReaction, User } from "../types/models";
import PostDisplay from "./PostDisplay";
import { apiCall } from "../utils/helpers";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import Select from "../common/Select";
import PostCommentsModal from "./PostCommentsModal";
import DraftPostModal from "./DraftPostModal";
import DeletionConfirmationModal from "../common/DeletionConfirmationModal";
import NotSignedInModal from "../common/NotSignedInModal";
import ReactionSummaryModal from "./ReactionSummaryModal";

type PostFilter = 'all' | 'following' | 'mine';
type PostFeedState = {
  filter: PostFilter;
  page: number;
}

export type DraftPost = {
  body: string;
  imageUrls: string[];
  userModelIds: number[];
}

const emptyDraftPost = {
  body: '',
  imageUrls: [],
  userModelIds: []
};

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

  const [notSignedInModalVisible, setNotSignedInModalVisible] = useState(false);
  const [draftPostModalVisible, setDraftPostModalVisible] = useState(false);
  const [reactionSummaryModalVisible, setReactionSummaryModalVisible] = useState(false);
  const [postCommentsModalVisible, setPostCommentsModalVisible] = useState(false);
  const [postDeletionConfirmationModalVisible, setPostDeletionConfirmationModalVisible] = useState(false);
  const [commentDeletionConfirmationModalVisible, setCommentDeletionConfirmationModalVisible] = useState(false);
  
  const [draftPost, setDraftPost] = useState<DraftPost>(emptyDraftPost);

  const [reactionSummaryModalReactions, setReactionSummaryModalReactions] = useState<PostReaction[]>([]);

  const [commentModalPost, setCommentModalPost] = useState<Post | null>(null);
  const [commentModalPostComments, setCommentModalPostComments] = useState<PostComment[]>([]);

  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);
  const [commentIdToDelete, setCommentIdToDelete] = useState<number | null>(null);
  
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
    if (!props.current_user) {
      setNotSignedInModalVisible(true);
      return;
    }

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
            post_reactions: body.post_reactions
          };
        }));
      });
  }

  async function reactToPostComment(postId: number, postCommentId: number, reaction: string, toggle: boolean) {
    if (!props.current_user) {
      setNotSignedInModalVisible(true);
      setPostCommentsModalVisible(false);
      return;
    }
    
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
                post_comment_reactions: body.post_comment_reactions
              };
            })
          };
        }));

        setCommentModalPostComments(
          commentModalPostComments.map((postComment) => {
            if (postComment.id !== postCommentId) return postComment;
            return {
              ...postComment,
              post_comment_reactions: body.post_comment_reactions
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
        body: draftPost.body.trim(),
        image_urls: draftPost.imageUrls,
        user_model_ids: draftPost.userModelIds
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

  async function deletePost(postId: number) {
    apiCall({
      method: 'DELETE',
      endpoint: '/social/posts/'+postId
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        setPostDatas(postDatas.filter((postData) => postData.post.id !== postId));
      });
  }

  async function deletePostComment(postCommentId: number) {
    apiCall({
      method: 'DELETE',
      endpoint: '/social/post_comments/'+postCommentId
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        setPostDatas(postDatas.map((postData) => {
          return {
            ...postData,
            post_comments: postData.post_comments.filter((postComment) => postComment.id !== postCommentId)
          };
        }));
        setCommentModalPostComments(
          commentModalPostComments.filter((postComment) => postComment.id !== postCommentId)
        );
      });
  }

  function viewReactionSummary(postReactions: PostReaction[]) {
    setReactionSummaryModalReactions(postReactions);
    setReactionSummaryModalVisible(true);
  }
  
  function viewComments(post: Post, postComments: PostComment[]) {
    if (props.current_user || postComments.length > 0) {
      setCommentModalPost(post);
      setCommentModalPostComments(postComments);
      setPostCommentsModalVisible(true);
    } else {
      setNotSignedInModalVisible(true);
    }
  }

  function toggleFollow(userId: number, toggle: boolean) {
    if (!props.current_user) {
      setNotSignedInModalVisible(true);
      return;
    }

    apiCall({
      method: 'POST',
      endpoint: '/social/follows',
      body: {
        user_id: userId,
        follow: toggle
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        setPostDatas(postDatas.map((postData) => {
          if (postData.user.id !== userId) return postData;
          return {
            ...postData,
            is_followed_by_current_user: toggle
          };
        }));

        setCommentModalPostComments(
          commentModalPostComments.map((postComment) => {
            if (postComment.user_id !== userId) return postComment;
            return {
              ...postComment,
              is_followed_by_current_user: toggle
            };
          })
        );
      });
  }

  function handleCreatePostClicked() {
    if (props.current_user) {
      setDraftPostModalVisible(true);
    } else {
      setNotSignedInModalVisible(true);
    }
  }

  function handleDeletePostClicked(postId: number) {
    setPostIdToDelete(postId);
    setPostDeletionConfirmationModalVisible(true);
  }

  function handleDeletePostCanceled() {
    setPostDeletionConfirmationModalVisible(false);
    setPostIdToDelete(null);
  }

  function handleDeletePostConfirmed() {
    setPostDeletionConfirmationModalVisible(false);
    if (postIdToDelete) deletePost(postIdToDelete);
    setPostIdToDelete(null);
  }

  function handleDeleteCommentClicked(postCommentId: number) {
    setCommentIdToDelete(postCommentId);
    setCommentDeletionConfirmationModalVisible(true);
  }

  function handleDeleteCommentCanceled() {
    setCommentDeletionConfirmationModalVisible(false);
    setCommentIdToDelete(null);
  }

  function handleDeleteCommentConfirmed() {
    setCommentDeletionConfirmationModalVisible(false);
    if (commentIdToDelete) deletePostComment(commentIdToDelete);
    setCommentIdToDelete(null);
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
          <Button onClick={handleCreatePostClicked}>
            <FontAwesomeIcon
              icon={byPrefixAndName.fas['pen-to-square']}
              className='mr-1' />
            Post
          </Button>
        </div>
      </div>

      <NotSignedInModal
        visible={notSignedInModalVisible}
        onClose={() => setNotSignedInModalVisible(false)} />

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
          currentUserId={props.current_user?.id}
          post={commentModalPost}
          postComments={commentModalPostComments}
          reactToPostComment={reactToPostComment}
          viewReactionSummary={viewReactionSummary}
          submitComment={submitComment}
          onToggleFollow={toggleFollow}
          onDelete={handleDeleteCommentClicked} />
      }

      <DeletionConfirmationModal
        visible={postDeletionConfirmationModalVisible}
        bodyText={'Are you sure you want to delete this post?'}
        onClose={handleDeletePostCanceled}
        onConfirm={handleDeletePostConfirmed} />

      <DeletionConfirmationModal
        visible={commentDeletionConfirmationModalVisible}
        bodyText={'Are you sure you want to delete this comment?'}
        onClose={handleDeleteCommentCanceled}
        onConfirm={handleDeleteCommentConfirmed} />

      <ReactionSummaryModal
        postReactions={reactionSummaryModalReactions}
        visible={reactionSummaryModalVisible}
        onClose={() => setReactionSummaryModalVisible(false)} />

      {postDatas.map((postData) => (
        <PostDisplay
          key={postData.post.id}
          postData={postData}
          currentUserId={props.current_user?.id}
          onReact={(reaction, toggle) => reactToPost(postData.post.id, reaction, toggle)}
          onToggleFollow={(toggle) => toggleFollow(postData.user.id, toggle)}
          onDelete={() => handleDeletePostClicked(postData.post.id)}
          viewComments={() => viewComments(postData.post, postData.post_comments)}
          viewReactionSummary={() => viewReactionSummary(postData.post_reactions)}
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
