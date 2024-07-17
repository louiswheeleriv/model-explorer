import React from "react";

type Props = {
  width: string;
  height?: string;
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
      style={{ width: props.width, height: props.height || props.width, borderRadius: '50%' }}
      onClick={props.onClick}></img> 
  );
};

export default ProfilePicture;
