import React from "react";
import { PostReaction } from "../types/models";
import Modal from "../common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import ProfilePicture from "../common/ProfilePicture";

type Props = {
  postReactions: PostReaction[];
  visible: boolean;
  onClose: () => void;
  className?: string;
};

const ReactionSummaryModal = (props: Props) => {
  return (
    <Modal
      headerText='Reactions'
      visible={props.visible}
      onClose={props.onClose}>

      {props.postReactions.map((postReaction) => (
        <div key={postReaction.id} className='flex items-center mb-2'>
          <FontAwesomeIcon
            icon={byPrefixAndName.fas['heart']}
            size='xl'
            className='text-red-500 mr-2 flex-none' />
          <ProfilePicture
            imageUrl={postReaction.user_profile_picture_url}
            onClick={() => window.location.href = '/users/'+postReaction.user_id}
            className='flex-none mr-2'
            width='45px' />
          <div className='flex-1 text-left text-xl'>
            {postReaction.user_display_name || postReaction.user_username}
          </div>
        </div>
      ))}
      {props.postReactions.length === 0 &&
        <div className='text-center text-gray-500 italic'>
          No reactions
        </div>
      }
    </Modal>
  );
};

export default ReactionSummaryModal;
