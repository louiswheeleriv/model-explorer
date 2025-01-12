import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import Button from "../common/Button";
import { DraftPost } from ".";
import TextArea from "../common/TextArea";
import { uploadImage } from "../utils/helpers";
import PostHeader from "./PostHeader";
import User from "./User";
import { Carousel } from "flowbite-react";

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

  useEffect(() => {
    setDraftPost(props.draftPost);
  }, [props.draftPost]);

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
  }

  return (
    <Modal
      headerText='New Post'
      visible={props.visible}
      onClose={props.onClose}>
        <PostHeader
          userId={props.currentUser.id}
          userDisplayName={props.currentUser.display_name || props.currentUser.username}
          userProfilePictureUrl={props.currentUserProfilePictureUrl} />

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

        <div className='flex'>
          <div className='flex-1 text-left'>
            <input
              id='image-input'
              type='file'
              accept='image/*'
              onChange={handleFileSelected}
              multiple
              className='mt-5 hidden' />
            <Button
              onClick={() => document.getElementById('image-input')?.click()}
              colorSet='lightgray'
              className='mr-3'>
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas['camera']}
                  className='mr-1' />
                Upload
            </Button>
            <Button
              onClick={clearUploadedImages}
              colorSet='lightgray'
              className='mr-3'>
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas['camera-slash']}
                  className='mr-1' />
                Clear
            </Button>
          </div>
          <div className='flex-none text-right'>
            <Button
              disabled={!draftPost.body}
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
