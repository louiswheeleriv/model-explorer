import React, { useState } from "react";
import { UserImage, UserModel, UserModelImageAssociation } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { Carousel } from "flowbite-react";
import Button from "../common/Button";
import EditUserModelGallery from "./EditUserModelGallery";

type Props = {
  userModel: UserModel;
  userImages: UserImage[];
  userModelImageAssociations: UserModelImageAssociation[];
}

type Mode = 'view' | 'edit';

const UserModelGallery = (props: Props) => {
  const [mode, setMode] = useState<Mode>('view');
  const [images, setImages] = useState<UserImage[]>(
    props.userModelImageAssociations.map((assoc) => (
      props.userImages.find((img) => img.id === assoc.user_image_id) ||
        { id: 0, user_id: 0, url: 'URL_BROKEN' }
    ))
  );

  const componentId = 'user-model-gallery';

  return (
    <div id={componentId}>
      {mode === 'view' &&
        <>
          <div className='text-end my-3'>
            <Button
              onClick={() => setMode('edit')}
              className='px-3 mx-auto'>
              <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} className='mr-2' />
              Edit Images
            </Button>
          </div>
          {images.length === 0 &&
            <div className='text-center'>
              No images
            </div>
          }
          {images.length > 0 &&
            <Carousel slide={false} className='h-[400px]'>
              {images.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  className='object-contain max-w-[75%] max-h-[100%]' />
              ))}
            </Carousel>
          }
        </>
      }
      {mode === 'edit' &&
        <EditUserModelGallery
          userModel={props.userModel}
          userImages={props.userImages}
          userModelImageAssociations={props.userModelImageAssociations}
          onCancel={() => setMode('view')} />
      }
    </div>
  );
};

export default UserModelGallery;
