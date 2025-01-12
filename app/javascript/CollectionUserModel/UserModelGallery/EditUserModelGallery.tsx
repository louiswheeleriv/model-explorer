import React, { useEffect, useState } from "react";
import { UserImage, UserModel, UserImageAssociation } from "../../types/models";
import Button from "../../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall, generateUuid, uploadImage } from "../../utils/helpers";
import { ProposedImage } from "./UserModelGalleryDraggableItem";
import UserModelGalleryDraggableList from "./UserModelGalleryDraggableList";
import FileUploadSpinner from "../../common/FileUploadSpinner";

type Props = {
  userModel: UserModel;
  userImages: UserImage[];
  userImageAssociations: UserImageAssociation[];
  onCancel: () => void;
}

const EditUserModelGallery = (props: Props) => {
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [numFilesUploaded, setNumFilesUploaded] = useState(0);
  const [numFilesToUpload, setNumFilesToUpload] = useState(0);
  const originalImages = props.userImageAssociations.map((imgAssoc) => {
    const image = props.userImages.find((img) => img.id === imgAssoc.user_image_id);
    return {
      id: imgAssoc.user_image_id.toString(),
      userImageId: imgAssoc.user_image_id,
      imageUrl: image?.url || 'URL_BROKEN'
    };
  });
  const [images, setImages] = useState<ProposedImage[]>(originalImages);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  async function saveImages() {
    apiCall({
      endpoint: '/user-models/'+props.userModel.id+'/images',
      method: 'POST',
      body: {
        images: images.map((img, index) => ({
          user_image_id: img.userImageId,
          url: img.imageUrl,
          sort_index: index
        }))
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) {
          setError(body.error || body.exception);
        } else {
          window.location.assign('/user-models/'+props.userModel.id+'?mode=gallery');
        }
      });
  }

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
    setImages(
      images.concat(
        imageUrls.map((url) => ({
          id: generateUuid(),
          imageUrl: url
        }))
      )
    );
    setIsUploadingFiles(false);
  }

  useEffect(() => {
    setSaveButtonDisabled(
      isUploadingFiles || (
        images.length == originalImages.length &&
        images.every((img, index) => (
          img.userImageId == originalImages[index]?.userImageId
        ))
      )
    );
  }, [images, isUploadingFiles]);

  const componentId = 'edit-user-model-gallery';

  return (
    <div id={componentId}>
      <div className='my-4 flex'>
        <div className='flex-none'>
          <Button onClick={props.onCancel} colorSet='lightgray'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} className='sm:mr-2' />
            <span className='hidden sm:inline'>Cancel</span>
          </Button>
        </div>
        <div className='flex-1 text-end'>
          <input
            id='image-input'
            type='file'
            accept='image/*'
            onChange={handleFileSelected}
            multiple
            className='mt-5 hidden' />

          <Button
            onClick={() => document.getElementById('image-input')?.click()}
            className='mr-3'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} className='mr-2' />
            Add Images
          </Button>
          <Button onClick={saveImages} disabled={saveButtonDisabled}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disk']} className='mr-2' />
            Save
          </Button>
        </div>
      </div>

      {isUploadingFiles &&
        <FileUploadSpinner
          numItemsComplete={numFilesUploaded}
          numItemsTotal={numFilesToUpload} />
      }

      <div className='text-red-500 text-center'>{error}</div>

      {images.length === 0 && !isUploadingFiles &&
        <div className='text-center'>
          No images
        </div>
      }

      <UserModelGalleryDraggableList
        images={images}
        onImagesUpdated={setImages} />
    </div>
  );
};

export default EditUserModelGallery;
