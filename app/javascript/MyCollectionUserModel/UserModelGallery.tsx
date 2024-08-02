import React, { useState } from "react";
import { UserImage, UserModel, UserModelImageAssociation } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall } from "../utils/helpers";

import { Carousel } from "flowbite-react";
import EditUserModelGallery from "./EditUserModelGallery";

type Props = {
  userModel: UserModel;
  userImages: UserImage[];
  userModelImageAssociations: UserModelImageAssociation[];
}

type Mode = 'view' | 'edit';

const UserModelGallery = (props: Props) => {
  const [mode, setMode] = useState<Mode>('view');
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>();

  async function uploadImages() {
    if (!selectedFiles) throw 'No file(s) selected.'

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        await uploadImage(selectedFiles[i]);
      }
      location.reload();
    } catch(err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  async function uploadImage(image: File) {
    console.log('uploading image');
    const presignedUrl = await getPresignedUrl();
    const imageUrl = await uploadImageToS3(presignedUrl, image);
    await createImage(imageUrl);
  }

  async function getPresignedUrl(): Promise<string> {
    return apiCall({
      endpoint: '/user-assets/upload',
      method: 'GET'
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        return body.presigned_url;
      });
  }

  async function uploadImageToS3(presignedUrl: string, image: File) {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: image
    });
    return response.url.split('?')[0];
  }

  async function createImage(assetUrl: string) {
    apiCall({
      endpoint: '/user-assets/upload',
      method: 'POST',
      body: {
        asset_url: assetUrl,
        user_model_id: props.userModel.id
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
      });
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files as FileList;
    setSelectedFiles(Array.from(selectedFiles));
  }

  const componentId = 'user-model-gallery';

  return (
    <div id={componentId}>
      <div className='flex mt-3'>
        <div onClick={() => setMode('view')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'view' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['eye']} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>View Gallery</span>
        </div>
        <div onClick={() => setMode('edit')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'edit' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['pencil']} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>Edit Gallery</span>
        </div>
      </div>

      {mode === 'view' &&
        <Carousel slide={false} className='h-[400px]'>
          {props.userImages.map((img) => (
            <img
              key={img.id}
              src={img.url}
              className='object-contain max-w-[75%] max-h-[100%]' />
          ))}
        </Carousel>
      }
      {mode === 'edit' &&
        <EditUserModelGallery
          userModel={props.userModel}
          userImages={props.userImages}
          userModelImageAssociations={props.userModelImageAssociations} />
      }
    </div>
  );
};

export default UserModelGallery;
