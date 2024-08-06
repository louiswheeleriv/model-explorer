import React, { useState } from "react";
import { Faction, User, UserFaction, UserFactionImageAssociation, UserImage, UserModel } from "../types/models";
import { Carousel } from "flowbite-react";
import ImageFullScreenOverlay from "../common/ImageFullScreenOverlay";

type Props = {
  faction: Faction;
  users: User[];
  userFactions: UserFaction[];
  userImages: UserImage[];
  userFactionImageAssociations: UserFactionImageAssociation[];
}

type ImageData = {
  user: User;
  userFaction: UserFaction;
  userImage: UserImage;
};

const FactionGallery = (props: Props) => {
  const userById = props.users.reduce((acc: Record<number, User>, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
  const userFactionById = props.userFactions.reduce((acc: Record<number, UserFaction>, userFaction) => {
    acc[userFaction.id] = userFaction;
    return acc;
  }, {});
  const userImageById = props.userImages.reduce((acc: Record<number, UserImage>, userImage) => {
    acc[userImage.id] = userImage;
    return acc;
  }, {});

  const [images, setImages] = useState<ImageData[]>(
    props.userFactionImageAssociations.map((assoc) => ({
      user: userById[assoc.user_id],
      userFaction: userFactionById[assoc.user_faction_id],
      userImage: userImageById[assoc.user_image_id]
    }))
  );

  const [imageFullScreenOverlayVisible, setImageFullScreenOverlayVisible] = useState(false);
  const [imageFullScreenOverlayImageUrl, setImageFullScreenOverlayImageUrl] = useState('');

  function handleCarouselImageClicked(img: UserImage) {
    setImageFullScreenOverlayImageUrl(img.url);
    setImageFullScreenOverlayVisible(true);
  }

  const componentId = 'faction-gallery';

  return (
    <div id={componentId}>
      {images.length === 0 &&
        <div className='text-center'>
          No images
        </div>
      }
      {images.length > 0 &&
        <>
          <Carousel slide={false} className='h-[400px]'>
            {images.map((img) => (
              <div key={img.userImage.id} className='m-auto text-center items-center'>
                <div className='mb-3'>
                  {img.user.display_name || img.user.username}'s {img.userFaction.name || props.faction.name}
                </div>
                <img
                  src={img.userImage.url}
                  onClick={() => handleCarouselImageClicked(img.userImage)}
                  className='m-auto object-contain max-w-[75%] max-h-[100%]' />
              </div>
            ))}
          </Carousel>
          <ImageFullScreenOverlay
            visible={imageFullScreenOverlayVisible}
            imageUrl={imageFullScreenOverlayImageUrl}
            onClose={() => setImageFullScreenOverlayVisible(false)} />
        </>
      }
    </div>
  );
};

export default FactionGallery;
