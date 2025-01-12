import React, { useState } from "react";
import { PostData } from "../types/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import PostHeader from "./PostHeader";
import { Carousel } from "flowbite-react";

type Props = {
  postData: PostData;
  currentUserId: number;
  reactToPost: (postId: number, reaction: string, toggle: boolean) => void;
  onDelete?: () => void;
  viewComments: () => void;
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

  function likedByCurrentUser(): boolean {
    return props.postData.current_user_reactions.length > 0;
  }

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
        userProfilePictureUrl={props.postData.profile_picture?.url}
        timestamp={props.postData.post.created_at}
        isActionsDropdownOpen={isActionsDropdownOpen}
        onToggleActionsDropdown={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}
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
        <div className='flex-none text-left'>
          <FontAwesomeIcon
            icon={likedByCurrentUser() ? byPrefixAndName.fas['heart'] : byPrefixAndName.far['heart']}
            size='lg'
            className={'mr-1 cursor-pointer '+(likedByCurrentUser() ? 'text-red-500' : 'text-white')}
            onClick={() => props.reactToPost(props.postData.post.id, 'like', !likedByCurrentUser())} />
          {props.postData.post_reactions.length > 0 && props.postData.post_reactions.length}
        </div>
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
