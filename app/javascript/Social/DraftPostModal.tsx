import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import Button from "../common/Button";
import { DraftPost } from ".";
import TextArea from "../common/TextArea";
import { apiCall, uploadImage } from "../utils/helpers";
import PostHeader from "./PostHeader";
import User from "./User";
import { Carousel } from "flowbite-react";
import FileUploadSpinner from "../common/FileUploadSpinner";
import DraftPostModelSelectionModal from "./DraftPostModelSelectionModal";
import { UserModel } from "../types/models";
import UserModelProgressBar from "../CollectionFaction/UserFactionModels/UserModelProgressBar";

type InputTarget = { target: { value: string }};

type Props = {
  visible: boolean;
  currentUser: User;
  currentUserProfilePictureUrl?: string;
  draftPost: DraftPost;
  submitPost: (draftPost: DraftPost) => void;
  onClose: () => void;
  className?: string;
};

const DraftPostModal = (props: Props) => {
  const [draftPost, setDraftPost] = useState(props.draftPost);

  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [numFilesUploaded, setNumFilesUploaded] = useState(0);
  const [numFilesToUpload, setNumFilesToUpload] = useState(0);

  const [selectedUserModels, setSelectedUserModels] = useState<UserModel[]>([]);

  const [hasAnyAttachments, setHasAnyAttachments] = useState<boolean>(false);

  const [isModelSelectionModalVisible, setIsModelSelectionModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setDraftPost(props.draftPost);
  }, [props.draftPost]);

  useEffect(() => {
    setHasAnyAttachments(!!(
      draftPost.imageUrls.length > 0 ||
      draftPost.userModelIds.length > 0
    ));
  }, [draftPost]);

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files as FileList);
    if (!selectedFiles) return;

    setIsUploadingFiles(true);
    setNumFilesUploaded(0);
    setNumFilesToUpload(selectedFiles.length);
    let imageUrls = [];
    for (const file of selectedFiles) {
      const imageUrl = await uploadImage(file);
      imageUrls.push(imageUrl);
      setNumFilesUploaded(imageUrls.length);
    }
    imageUrls = uploadedImageUrls.concat(imageUrls);
    setUploadedImageUrls(imageUrls);
    setDraftPost({ ...draftPost, imageUrls: imageUrls });
    setIsUploadingFiles(false);
  }

  async function clearUploadedImages() {
    setUploadedImageUrls([]);
    setDraftPost({ ...draftPost, imageUrls: [] });
    document.getElementById('image-input')?.setAttribute('value', '');
  }

  function clearAttachedModels() {
    setDraftPost({ ...draftPost, userModelIds: [] });
    setSelectedUserModels([]);
  }

  async function handleUserModelsSelected(userModelIds: number[]) {
    setIsModelSelectionModalVisible(false);
    setDraftPost({ ...draftPost, userModelIds: userModelIds });
    if (userModelIds.length > 0) {
      const userModelById =
        (await getUserModels(userModelIds))
        .reduce((map, userModel) => {
          map[userModel.id] = userModel;
          return map;
        }, {} as Record<number, UserModel>);
      setSelectedUserModels(
        userModelIds.map(userModelId => userModelById[userModelId])
      );
    } else {
      setSelectedUserModels([]);
    }
  }

  function draftPostIsEmpty() {
    return !draftPost.body.trim() &&
      draftPost.imageUrls.length === 0 &&
      draftPost.userModelIds.length === 0;
  }

  function getUserModels(userModelIds: number[]): Promise<UserModel[]> {
    return apiCall({
      method: 'GET',
      endpoint: '/api/users/'+props.currentUser.id+'/user_models',
      urlParams: {
        user_model_ids: userModelIds
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        return body.user_models;
      });
  }

  return (
    <Modal
      headerText='New Post'
      visible={props.visible}
      onClose={props.onClose}>
        <PostHeader
          userId={props.currentUser.id}
          userDisplayName={props.currentUser.display_name || props.currentUser.username}
          userProfilePictureUrl={props.currentUserProfilePictureUrl}
          isFollowedByCurrentUser={false} />

        <TextArea
          placeholder='Write something...'
          value={draftPost.body}
          onChange={(e: InputTarget) => setDraftPost({ ...draftPost, body: e.target.value })}
          className='flex-1 mb-5' />

        {uploadedImageUrls.length > 0 &&
          <Carousel
            slide={false}
            className={'h-[320px] mb-5'}>
            {uploadedImageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                className='object-contain max-w-[100%] max-h-[100%]' />
            ))}
          </Carousel>
        }

        {isUploadingFiles &&
          <FileUploadSpinner
            numItemsComplete={numFilesUploaded}
            numItemsTotal={numFilesToUpload}
            className='mb-2' />
        }

        {selectedUserModels.map((userModel) => {
          if (!userModel.model_name) throw new Error('UserModel missing model_name');
          return (
            <UserModelProgressBar
              key={userModel.id}
              userModel={userModel}
              modelName={userModel.model_name}
              numImages={userModel.num_images}
              isClickable={false}
              className='mb-3' />
          );
        })}

        <DraftPostModelSelectionModal
          visible={isModelSelectionModalVisible}
          currentUserId={props.currentUser.id}
          onSelectUserModels={handleUserModelsSelected}
          onClose={() => setIsModelSelectionModalVisible(false)} />

        <div className='flex'>
          <div className='flex-1 text-left'>
            <input
              id='image-input'
              type='file'
              accept='image/*'
              onChange={handleFileSelected}
              multiple
              className='mt-5 hidden' />
            {!hasAnyAttachments &&
              <Button
                onClick={() => document.getElementById('image-input')?.click()}
                colorSet='lightgray'
                disabled={isUploadingFiles}
                className='mr-3'>
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['camera']}
                    className='mr-1' />
                  Upload
              </Button>
            }
            {draftPost.imageUrls.length > 0 &&
              <Button
                onClick={clearUploadedImages}
                colorSet='lightgray'
                disabled={isUploadingFiles}
                className='mr-3'>
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['camera-slash']}
                    className='mr-1' />
                  Clear
              </Button>
            }
            {draftPost.imageUrls.length === 0 &&
              <Button
                onClick={() => setIsModelSelectionModalVisible(true)}
                colorSet='lightgray'
                disabled={isUploadingFiles}
                className='mr-3'>
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['chess-knight']}
                    className='mr-1' />
                  Models
              </Button>
            }
            {(draftPost.userModelIds.length > 0) &&
              <Button
                onClick={clearAttachedModels}
                colorSet='lightgray'
                className='mr-3'>
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['chess-knight']}
                    className='mr-1' />
                  Clear
              </Button>
            }
          </div>

          <div className='flex-none text-right'>
            <Button
              disabled={isUploadingFiles || draftPostIsEmpty()}
              onClick={() => props.submitPost(draftPost)}
              className='px-5'>
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas['paper-plane']}
                  className='mr-2' />
                Post
            </Button>
          </div>
        </div>
    </Modal>
  );
};

export default DraftPostModal;
