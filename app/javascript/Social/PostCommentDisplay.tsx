import React, { useState } from "react";
import { PostComment, PostReaction } from "../types/models";
import PostHeader from "./PostHeader";
import PostReactions from "./PostReactions";

type Props = {
  postComment: PostComment;
  isLastComment: boolean;
  currentUserId?: number;
  onReact: (reaction: string, toggle: boolean) => void;
  viewReactionSummary: () => void;
  onToggleFollow: (toggle: boolean) => void;
  onDelete?: () => void;
  className?: string;
};

const PostCommentDisplay = (props: Props) => {
  // const regexBoldUsernames = /(\@[a-zA-Z0-9]+)/g;
  // const postBodyHtml = props.postData.post.body.replaceAll(regexBoldUsernames, '<b>$1</b>');
  const postCommentBodyHtml =
    props
      .postComment
      .body
      .replaceAll(/\n/g, '<br>');

  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);

  function likedByCurrentUser(): boolean {
    return currentUserReactions().length > 0;
  }

  function currentUserReactions(): PostReaction[] {
    return props.postComment.post_comment_reactions.filter((reaction) => reaction.user_id === props.currentUserId);
  }

  function handleDeleteClicked() {
    setIsActionsDropdownOpen(false);
    if (props.onDelete) props.onDelete();
  }

  return (
    <div className={'text-left mb-2 pb-2 '+(props.isLastComment ? '' : 'border-b border-gray-500 ')+(props.className || '')}>
      <PostHeader
        userId={props.postComment.user_id}
        userDisplayName={props.postComment.user_display_name || props.postComment.user_username}
        userProfilePictureUrl={props.postComment.user_profile_picture_url}
        currentUserId={props.currentUserId}
        isFollowedByCurrentUser={props.postComment.is_followed_by_current_user}
        timestamp={props.postComment.created_at}
        isActionsDropdownOpen={isActionsDropdownOpen}
        onToggleActionsDropdown={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}
        onToggleFollow={props.onToggleFollow}
        onDelete={handleDeleteClicked} />

      <div
        className='text-sm text-left mb-2'
        dangerouslySetInnerHTML={{ __html: postCommentBodyHtml }} />

      <div className='flex'>
        <div className='flex-none'>
          <PostReactions
            postReactions={props.postComment.post_comment_reactions}
            currentUserId={props.currentUserId}
            onReact={props.onReact}
            onLongPress={props.viewReactionSummary} />
        </div>
      </div>
    </div>
  );
};

export default PostCommentDisplay;
