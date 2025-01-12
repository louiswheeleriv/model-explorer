import React, { useState } from "react";
import { Post, PostComment } from "../types/models";
import Modal from "../common/Modal";
import PostCommentDisplay from "./PostCommentDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import Input from "../common/Input";
import Button from "../common/Button";

type InputTarget = { target: { value: string }};

type Props = {
  post: Post;
  postComments: PostComment[];
  visible: boolean;
  currentUserId?: number;
  reactToPostComment: (postId: number, postCommentId: number, reaction: string, toggle: boolean) => void;
  submitComment: (postId: number, body: string) => void;
  onDelete?: (postCommentId: number) => void;
  onClose: () => void;
  className?: string;
};

const PostCommentsModal = (props: Props) => {
  const [draftCommentBody, setDraftCommentBody] = useState('');

  function handleSubmitCommentClicked() {
    props.submitComment(props.post.id, draftCommentBody);
    setDraftCommentBody('');
  }

  function handleDeleteComment(postCommentId: number) {
    if (props.onDelete) props.onDelete(postCommentId);
  }

  return (
    <Modal
      headerText='Post Comments'
      visible={props.visible}
      onClose={props.onClose}>

      {props.postComments.map((postComment, index) => (
        <PostCommentDisplay
          key={postComment.id}
          postComment={postComment}
          currentUserId={props.currentUserId}
          reactToPostComment={props.reactToPostComment}
          isLastComment={index == (props.postComments.length - 1)}
          onDelete={() => handleDeleteComment(postComment.id)} />
      ))}

      {props.postComments.length == 0 &&
        <div className='text-center text-gray-500 italic mb-5'>
          No comments
        </div>
      }

      {props.currentUserId &&
        <div className='flex'>
          <Input
            placeholder='Add a comment'
            value={draftCommentBody}
            onChange={(e: InputTarget) => setDraftCommentBody(e.target.value)}
            className='flex-1' />
          <Button
            disabled={!draftCommentBody}
            onClick={handleSubmitCommentClicked}
            className='flex-none ml-1 px-4'>
              <FontAwesomeIcon icon={byPrefixAndName.fas['paper-plane']} />
          </Button>
        </div>
      }
    </Modal>
  );
};

export default PostCommentsModal;
