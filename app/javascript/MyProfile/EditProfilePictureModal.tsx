import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import { apiCall, uploadImage } from "../utils/helpers";
import ProfilePicture from "../common/ProfilePicture";
import Modal from "../common/Modal";

type Props = {
  currentProfilePictureUrl?: string;
  onClose: () => void;
  visible: boolean;
  className?: string;
}

const EditProfilePictureModal = (props: Props) => {
  const [proposedProfilePictureUrl, setProposedProfilePictureUrl] = useState<undefined | string>(props.currentProfilePictureUrl);
  const [error, setError] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  async function onSubmitButtonClick() {
    if (!proposedProfilePictureUrl) {
      setError('No image selected');
      return;
    }
    apiCall({
      endpoint: '/my-profile/profile-picture',
      method: 'PUT',
      body: {
        image_url: proposedProfilePictureUrl
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) {
          setError(body.error || body.exception);
        } else {
          location.reload();
        }
      });
  }

  function onCloseButtonClicked() {
    props.onClose();
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files ? e.target.files[0] : undefined;
    if (selectedFile) {
      const imageUrl = await uploadImage(selectedFile);
      setProposedProfilePictureUrl(imageUrl);
    } else {
      setProposedProfilePictureUrl(undefined);
    }
  }

  useEffect(() => {
    if (proposedProfilePictureUrl) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [proposedProfilePictureUrl]);

  return (
    <Modal
      id='edit-profile-picture-modal'
      headerText='Edit Profile Picture'
      visible={props.visible}
      onClose={props.onClose}>

      <div className='mb-4 flex'>
        <input
          id='profile-picture-input'
          type='file'
          accept='image/*'
          onChange={handleFileSelected}
          className='mt-5 hidden' />

        <Button
          onClick={() => document.getElementById('profile-picture-input')?.click()}
          className='px-3 mx-auto'>
          Select Image...
        </Button>
      </div>

      <div className='mb-4 flex'>
        <ProfilePicture
          width='200px'
          imageUrl={proposedProfilePictureUrl}
          className='mx-auto' />
      </div>

      <div className='flex items-center mb-5'>
        <Button onClick={onSubmitButtonClick} disabled={submitButtonDisabled} className='max-w-[170px] mx-auto'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disk']} className='mr-2' />
          Save
        </Button>
      </div>

      <div className='text-center text-red-500'>{error}</div>
    </Modal>
  );
};

export default EditProfilePictureModal;
