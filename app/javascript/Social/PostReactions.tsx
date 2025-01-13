import React, { useRef, useState } from "react";
import { PostReaction } from "../types/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";

type Props = {
  postReactions: PostReaction[];
  currentUserId?: number;
  onReact: (reaction: string, toggle: boolean) => void;
  onLongPress: () => void;
  className?: string;
};

const PostReactions = (props: Props) => {
  const [reactPressAction, setReactPressAction] = useState<null | 'click' | 'longpress'>(null);
  const reactPressTimerRef = useRef<number>();
  const reactIsLongPress = useRef<boolean>();

  function likedByCurrentUser(): boolean {
    return props.postReactions.filter((reaction) => reaction.user_id === props.currentUserId).length > 0;
  }

  function startPressTimer() {
    reactIsLongPress.current = false;
    reactPressTimerRef.current = setTimeout(() => {
      reactIsLongPress.current = true;
      props.onLongPress();
    }, 600);
  }

  function handleReactMouseDown() {
    startPressTimer();
  }

  function handleReactMouseUp() {
    clearTimeout(reactPressTimerRef.current);
  }

  function handleReactTouchEnd() {
    if ( reactPressAction === 'longpress' ) return;
    clearTimeout(reactPressTimerRef.current);
  }

  function handleReactMouseClick() {
    if (reactIsLongPress.current) return;
    props.onReact('like', !likedByCurrentUser());
  }

  return (
    <div
      className={'text-left '+props.className}
      onMouseDown={handleReactMouseDown}
      onTouchStart={handleReactMouseDown}
      onMouseUp={handleReactTouchEnd}
      onTouchEnd={handleReactMouseUp}
      onClick={handleReactMouseClick}>
        <FontAwesomeIcon
          icon={likedByCurrentUser() ? byPrefixAndName.fas['heart'] : byPrefixAndName.far['heart']}
          size='lg'
          className={'mr-1 cursor-pointer '+(likedByCurrentUser() ? 'text-red-500' : 'text-white')} />
        {props.postReactions.length > 0 && props.postReactions.length}
    </div>
  );
};

export default PostReactions;
