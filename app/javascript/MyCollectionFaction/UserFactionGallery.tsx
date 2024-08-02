import React, { useState } from "react";
import { Faction, UserImage, UserModel } from "../types/models";

type Props = {
  faction: Faction;
  userImages: UserImage[];
}

const UserFactionGallery = (props: Props) => {
  const [error, setError] = useState('');

  const componentId = 'user-faction-gallery';

  return (
    <div id={componentId}>
      <div className='text-center mt-5'>
        Coming soon: Upload and manage photos of your models for others to enjoy
      </div>
    </div>
  );
};

export default UserFactionGallery;
