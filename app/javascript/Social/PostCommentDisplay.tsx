import React, { useState } from "react";
import { PostComment } from "../types/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import PostHeader from "./PostHeader";

type Props = {
  postComment: PostComment;
  isLastComment: boolean;
  currentUserId?: number;
  reactToPostComment: (postId: number, postCommentId: number, reaction: string, toggle: boolean) => void;
  onDelete?: () => void;
  className?: string;
};

const PostCommentDisplay = (props: Props) => {
  // const regexBoldUsernames = /(\@[a-zA-Z0-9]+)/g;
  // const postBodyHtml = props.postData.post.body.replaceAll(regexBoldUsernames, '<b>$1</b>');
  const postCommentBodyHtml = props.postComment.body;

  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);

  function likedByCurrentUser(): boolean {
    return props.postComment.current_user_reactions.length > 0;
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
        timestamp={props.postComment.created_at}
        isActionsDropdownOpen={isActionsDropdownOpen}
        onToggleActionsDropdown={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}
        onDelete={handleDeleteClicked} />

      <div
        className='text-sm text-left mb-2'
        dangerouslySetInnerHTML={{ __html: postCommentBodyHtml }} />

      <div className='flex'>
        <div className='flex-none text-left'>
          <FontAwesomeIcon
            icon={likedByCurrentUser() ? byPrefixAndName.fas['heart'] : byPrefixAndName.far['heart']}
            size='lg'
            className={'mr-1 cursor-pointer '+(likedByCurrentUser() ? 'text-red-500' : 'text-white')}
            onClick={() => props.reactToPostComment(props.postComment.post_id, props.postComment.id, 'like', !likedByCurrentUser())} />
          {props.postComment.post_comment_reactions.length > 0 && props.postComment.post_comment_reactions.length}
        </div>
      </div>
    </div>
  );
};

export default PostCommentDisplay;
