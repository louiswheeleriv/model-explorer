import React, { useState } from "react";
import { Post, PostComment, PostReaction } from "../types/models";
import Modal from "../common/Modal";
import PostCommentDisplay from "./PostCommentDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import Button from "../common/Button";
import TextArea from "../common/TextArea";

type InputTarget = { target: { value: string }};

type Props = {
  post: Post;
  postComments: PostComment[];
  visible: boolean;
  currentUserId?: number;
  reactToPostComment: (postId: number, postCommentId: number, reaction: string, toggle: boolean) => void;
  viewReactionSummary: (postReactions: PostReaction[]) => void;
  submitComment: (postId: number, body: string) => void;
  onToggleFollow: (userId: number, toggle: boolean) => void;
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
          onReact={(reaction, toggle) => props.reactToPostComment(props.post.id, postComment.id, reaction, toggle)}
          viewReactionSummary={() => props.viewReactionSummary(postComment.post_comment_reactions)}
          isLastComment={index == (props.postComments.length - 1)}
          onToggleFollow={(toggle) => props.onToggleFollow(postComment.user_id, toggle)}
          onDelete={() => handleDeleteComment(postComment.id)} />
      ))}

      {props.postComments.length == 0 &&
        <div className='text-center text-gray-500 italic mb-5'>
          No comments
        </div>
      }

      {props.currentUserId &&
        <>
          <TextArea
            placeholder='Add a comment'
            value={draftCommentBody}
            onChange={(e: InputTarget) => setDraftCommentBody(e.target.value)}
            className='mb-2' />
          <div className='flex'>
            <Button
              disabled={!draftCommentBody}
              onClick={handleSubmitCommentClicked}
              className='flex-none px-5 mx-auto'>
                <FontAwesomeIcon icon={byPrefixAndName.fas['paper-plane']} className='mr-1' />
                Send
            </Button>
          </div>
        </>
      }
    </Modal>
  );
};

export default PostCommentsModal;
