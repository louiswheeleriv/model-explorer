import React, { useState } from "react";
import { PostData } from "../types/models";
import PostHeader from "./PostHeader";
import { Carousel } from "flowbite-react";
import PostReactions from "./PostReactions";

type Props = {
  postData: PostData;
  currentUserId?: number;
  onReact: (reaction: string, toggle: boolean) => void;
  onToggleFollow: (toggle: boolean) => void;
  onDelete?: () => void;
  viewComments: () => void;
  viewReactionSummary: () => void;
  className?: string;
};

const PostDisplay = (props: Props) => {
  // const regexBoldUsernames = /(\@[a-zA-Z0-9]+)/g;
  // const postBodyHtml = props.postData.post.body.replaceAll(regexBoldUsernames, '<b>$1</b>');
  const postBodyHtml =
    props
      .postData
      .post
      .body
      .replaceAll(/\n/g, '<br>');

  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);

  function handleDeleteClicked() {
    setIsActionsDropdownOpen(false);
    if (props.onDelete) props.onDelete();
  }

  return (
    <div className={'p-3 bg-[#607499] rounded-md '+(props.className || '')}>
      <PostHeader
        userId={props.postData.user.id}
        userDisplayName={props.postData.user.display_name || props.postData.user.username}
        currentUserId={props.currentUserId}
        isFollowedByCurrentUser={props.postData.is_followed_by_current_user}
        userProfilePictureUrl={props.postData.profile_picture?.url}
        timestamp={props.postData.post.created_at}
        isActionsDropdownOpen={isActionsDropdownOpen}
        onToggleActionsDropdown={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}
        onToggleFollow={props.onToggleFollow}
        onDelete={handleDeleteClicked} />

      <div
        className='text-sm text-left mb-2'
        dangerouslySetInnerHTML={{ __html: postBodyHtml }} />

      {props.postData.user_images.length > 0 &&
        <Carousel
          slide={false}
          className={'h-[320px] mb-2'}>
          {props.postData.user_images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              className='object-contain max-w-[100%] max-h-[100%]' />
          ))}
        </Carousel>
      }

      <div className='flex'>
        <PostReactions
          postReactions={props.postData.post_reactions}
          currentUserId={props.currentUserId}
          onReact={props.onReact}
          onLongPress={props.viewReactionSummary}
          className='flex-none' />
        <div className='flex-1'></div>
        {props.postData.post_comments.length === 0 &&
          <div
            className='flex-none text-right cursor-pointer'
            onClick={props.viewComments}>
              Comment
          </div>
        }
        {props.postData.post_comments.length > 0 &&
          <div
            className='flex-none text-right cursor-pointer'
            onClick={props.viewComments}>
              {props.postData.post_comments.length} Comments
          </div>
        }
      </div>
    </div>
  );
};

export default PostDisplay;
