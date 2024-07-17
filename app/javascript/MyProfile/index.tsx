import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { User, UserImage } from "../types/models";
import Input from "../common/Input";
import ProfilePicture from "../common/ProfilePicture";

type Props = {
  user: User;
  user_password_length: number;
  user_profile_picture: UserImage;
}

const MyProfile = (props: Props) => {
  const dummyPassword = new Array(props.user_password_length + 1).join('x');

  function openEditProfilePictureModal() {
    console.log('open profile pic modal');
  }

  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <h2 className='text-center text-2xl mb-[50px]'>
        My Profile
      </h2>
      
      <div className='text-center'>
        <ProfilePicture
          width='200px'
          imageUrl={props.user_profile_picture?.url}
          onClick={openEditProfilePictureModal}
          className='mx-auto' />
      </div>
      
      <div className='mt-5 mb-2 text-sm font-medium'>Display Name</div>
      <Input
        defaultValue={props.user.display_name}
        disabled />

      <div className='mt-5 mb-2 text-sm font-medium'>Username</div>
      <Input
        value={props.user.username}
        disabled />

      <div className='mt-5 mb-2 text-sm font-medium'>Password</div>
      <Input
        type='password'
        value={dummyPassword}
        disabled />

      <div className='mt-5 mb-2 text-sm font-medium'>Bio</div>
      <Input
        defaultValue={props.user.bio}
        disabled />
    </div>
  );
};

export default MyProfile;
