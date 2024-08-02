import React from "react";

type Props = {
  width: string;
  imageUrl?: string;
  id?: string;
  className?: string;
  onClick?: () => void;
};

const ProfilePicture = (props: Props) => {
  const defaultPicturePath = '/images/default_profile_picture.png';

  return (
    <img
      id={props.id}
      className={props.className}
      src={props.imageUrl || defaultPicturePath}
      style={{
        width: props.width,
        height: props.width,
        objectFit: 'cover',
        borderRadius: '50%'
      }}
      onClick={props.onClick}></img>
  );
};

export default ProfilePicture;
