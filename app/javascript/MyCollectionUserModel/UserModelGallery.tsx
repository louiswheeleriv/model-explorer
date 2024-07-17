import React, { useState } from "react";
import { UserImage, UserModel } from "../types/models";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall } from "../utils/helpers";

type Props = {
  userModel: UserModel;
  userImages: UserImage[];
}

const UserModelGallery = (props: Props) => {
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
      {/* <div className='flex items-center mt-5'>
        <label htmlFor="myfile">Select image:</label>
        <input
          type="file"
          id="myfile"
          name="myfile"
          accept="image/*"
          multiple
          onChange={handleFileSelected} />

        <Button onClick={uploadImages} className='max-w-[170px] mx-auto'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} className='mr-2' />
          Upload
        </Button>
      </div>

      <div className='text-red-500 text-center'>{error}</div>

      <div>
        {props.userImages.map((img) => (
          <img key={img.id} src={img.url}></img>
        ))}
      </div> */}

      <div className='text-center mt-5'>
        Coming soon: Upload and manage photos of your models for others to enjoy
      </div>
    </div>
  );
};

export default UserModelGallery;
