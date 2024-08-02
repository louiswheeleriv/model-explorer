import React, { useState } from "react";
import { UserImage, UserModel, UserModelImageAssociation } from "../types/models";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall, uploadImage } from "../utils/helpers";

import { Carousel } from "flowbite-react";

type Props = {
  userModel: UserModel;
  userImages: UserImage[];
  userModelImageAssociations: UserModelImageAssociation[];
}

type Mode = 'view' | 'edit';

type ProposedImage = {
  user_image_id?: number;
  image_url: string;
}

const EditUserModelGallery = (props: Props) => {
  const [proposedImages, setProposedImages] = useState<ProposedImage[]>(
    props.userModelImageAssociations.map((imgAssoc) => {
      const image = props.userImages.find((img) => img.id === imgAssoc.user_image_id);
      return {
        user_image_id: imgAssoc.user_image_id,
        image_url: image?.url || 'URL_BROKEN'
      };
    })
  );
  const [imageUrls, setImageUrls] = useState<string[]>(props.userImages.map((img) => img.url));
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>();

  async function saveImages() {
    apiCall({
      endpoint: '/my-collection/user-factions/'+props.userModel.user_faction_id+'/user-models/'+props.userModel.id+'/images',
      method: 'POST',
      body: {
        images: proposedImages.map((img, index) => (
          {
            user_image_id: img.user_image_id,
            url: img.image_url,
            sort_index: index
          }
        ))
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

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files as FileList);
    if (!selectedFiles) return;
    
    let imageUrls = [];
    for (const file of selectedFiles) {
      const imageUrl = await uploadImage(file);
      imageUrls.push(imageUrl);
    }
    setProposedImages(
      proposedImages.concat(imageUrls.map((url) => ({ image_url: url })))
    );
  }

  function moveImageUp(index: number) {
    if (index <= 0) throw 'Cannot move top image up!';

    const imageToMoveUp = proposedImages[index];
    const imageToMoveDown = proposedImages[index - 1];
    setProposedImages([
      proposedImages.slice(0, index - 1),
      imageToMoveUp,
      imageToMoveDown,
      proposedImages.slice(index + 1)
    ].flat());
  }

  function moveImageDown(index: number) {
    if (index >= proposedImages.length - 1) throw 'Cannot move bottom image down!';

    const imageToMoveDown = proposedImages[index];
    const imageToMoveUp = proposedImages[index + 1];
    setProposedImages([
      proposedImages.slice(0, index),
      imageToMoveUp,
      imageToMoveDown,
      proposedImages.slice(index + 2)
    ].flat());
  }

  function removeImage(index: number) {
    setProposedImages([
      proposedImages.slice(0, index),
      proposedImages.slice(index + 1)
    ].flat());
  }

  const componentId = 'edit-user-model-gallery';

  return (
    <div id={componentId}>
      <div className='my-4 flex'>
        <div className='flex-1'>
          <input
            id='image-input'
            type='file'
            accept='image/*'
            onChange={handleFileSelected}
            multiple
            className='mt-5 hidden' />

          <Button
            onClick={() => document.getElementById('image-input')?.click()}
            className='px-3 mx-auto'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} className='mr-1' />
            Add Image(s)
          </Button>
        </div>
        <div className='flex-1 text-end'>
          <Button
            onClick={saveImages}
            className='px-3 mx-auto'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disk']} className='mr-1' />
            Save
          </Button>
        </div>
      </div>

      {proposedImages.map((img, index) => (
        <div key={index} className='flex mt-5 p-4 border-2 border-gray-200'>
          <img
            key={index}
            src={img.image_url}
            className='flex-1 mx-auto max-w-[70%] max-h-[350px] object-contain' />
          <div className='flex flex-col text-center'>
            <div className='flex-1 align-middle'>
              <div>
                {index > 0 &&
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['up']}
                    onClick={() => moveImageUp(index)}
                    className='cursor-pointer'
                    size='xl' />
                }
              </div>
              <div>
                {index < proposedImages.length - 1 &&
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['down']}
                    onClick={() => moveImageDown(index)}
                    className={'cursor-pointer'+(index > 0 ? ' mt-4' : '')}
                    size='xl' />
                }
              </div>
            </div>
            <div className='flex-none'>
              <Button onClick={() => removeImage(index)} className='mx-auto bg-red-500'>
                <FontAwesomeIcon icon={byPrefixAndName.fas['trash']} className='text-white' />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditUserModelGallery;
