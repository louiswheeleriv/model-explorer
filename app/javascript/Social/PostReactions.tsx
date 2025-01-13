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

  const longPressMillis = 300;

  function likedByCurrentUser(): boolean {
    return props.postReactions.filter((reaction) => reaction.user_id === props.currentUserId).length > 0;
  }

  function startPressTimer() {
    reactIsLongPress.current = false;
    reactPressTimerRef.current = setTimeout(() => {
      reactIsLongPress.current = true;
      props.onLongPress();
    }, longPressMillis);
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
      className={'px-1 rounded cursor-pointer select-none '+(likedByCurrentUser() ? 'bg-slate-800 border border-[#909090]' : '')+' '+props.className}
      onMouseDown={handleReactMouseDown}
      onTouchStart={handleReactMouseDown}
      onMouseUp={handleReactTouchEnd}
      onTouchEnd={handleReactMouseUp}
      onClick={handleReactMouseClick}>
        <FontAwesomeIcon
          icon={byPrefixAndName.fas['heart']}
          size='lg'
          className='text-red-500' />
        {props.postReactions.length > 0 &&
          <span className='ml-1'>{props.postReactions.length}</span>
        }
    </div>
  );
};

export default PostReactions;
