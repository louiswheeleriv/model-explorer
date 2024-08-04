import React, { useState } from "react";
import { Model, User, UserImage, UserModel, UserModelImageAssociation } from "../types/models";
import { Carousel } from "flowbite-react";

type Props = {
  model: Model;
  users: User[];
  userModels: UserModel[];
  userImages: UserImage[];
  userModelImageAssociations: UserModelImageAssociation[];
}

type ImageData = {
  user: User;
  userModel: UserModel;
  userImage: UserImage;
};

const ModelGallery = (props: Props) => {
  const userById = props.users.reduce((acc: Record<number, User>, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
  const userModelById = props.userModels.reduce((acc: Record<number, UserModel>, userModel) => {
    acc[userModel.id] = userModel;
    return acc;
  }, {});
  const userImageById = props.userImages.reduce((acc: Record<number, UserImage>, userImage) => {
    acc[userImage.id] = userImage;
    return acc;
  }, {});

  const [images, setImages] = useState<ImageData[]>(
    props.userModelImageAssociations.map((assoc) => ({
      user: userById[assoc.user_id],
      userModel: userModelById[assoc.user_model_id],
      userImage: userImageById[assoc.user_image_id]
    }))
  );

  const componentId = 'model-gallery';

  return (
    <div id={componentId}>
      {images.length === 0 &&
        <div className='text-center'>
          No images
        </div>
      }
      {images.length > 0 &&
        <Carousel slide={false} className='h-[400px]'>
          {images.map((img) => (
            <div key={img.userImage.id} className='m-auto text-center items-center'>
              <div className='mb-3'>
                {img.user.display_name || img.user.username}'s {img.userModel.name || props.model.name}
              </div>
              <img
                src={img.userImage.url}
                className='m-auto object-contain max-w-[75%] max-h-[100%]' />
            </div>
          ))}
        </Carousel>
      }
    </div>
  );
};

export default ModelGallery;
