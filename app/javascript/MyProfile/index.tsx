import React, { useState } from "react";
import { User, UserImage } from "../types/models";
import Input from "../common/Input";
import ProfilePicture from "../common/ProfilePicture";
import Button from "../common/Button";
import EditUsernameModal from "./EditUsernameModal";
import EditDisplayNameModal from "./EditDisplayNameModal";
import EditBioModal from "./EditBioModal";
import EditPasswordModal from "./EditPasswordModal";
import EditProfilePictureModal from "./EditProfilePictureModal";
import EditEmailModal from "./EditEmailModal";

type Props = {
  user: User;
  user_password_length: number;
  user_profile_picture: UserImage;
}

const MyProfile = (props: Props) => {
  const dummyPassword = new Array(props.user_password_length + 1).join('x');

  const [editProfilePictureModalVisible, setEditProfilePictureModalVisible] = useState(false);
  const [editUsernameModalVisible, setEditUsernameModalVisible] = useState(false);
  const [editPasswordModalVisible, setEditPasswordModalVisible] = useState(false);
  const [editDisplayNameModalVisible, setEditDisplayNameModalVisible] = useState(false);
  const [editEmailModalVisible, setEditEmailModalVisible] = useState(false);
  const [editBioModalVisible, setEditBioModalVisible] = useState(false);

  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <h2 className='text-center text-2xl mb-[50px]'>
        My Profile
      </h2>
      
      <div className='text-center'>
        <ProfilePicture
          width='200px'
          imageUrl={props.user_profile_picture?.url}
          onClick={() => setEditProfilePictureModalVisible(true)}
          className='mx-auto' />
      </div>

      <div className='mt-5 mb-2 text-sm font-medium'>Username</div>
      <div className='flex'>
        <Input
          value={props.user.username}
          className='flex-1'
          disabled />
        <Button onClick={() => setEditUsernameModalVisible(true)} className='flex-none ml-5 px-5 max-w-36'>Edit</Button>
      </div>

      <div className='mt-5 mb-2 text-sm font-medium'>Password</div>
      <div className='flex'>
        <Input
          type='password'
          value={dummyPassword}
          className='flex-1'
          disabled />
        <Button onClick={() => setEditPasswordModalVisible(true)} className='flex-none ml-5 px-5 max-w-36'>Edit</Button>
      </div>

      <div className='mt-5 mb-2 text-sm font-medium'>Display Name</div>
      <div className='flex'>
        <Input
          defaultValue={props.user.display_name}
          className='flex-1'
          disabled />
        <Button onClick={() => setEditDisplayNameModalVisible(true)} className='flex-none ml-5 px-5 max-w-36'>Edit</Button>
      </div>

      <div className='mt-5 mb-2 text-sm font-medium'>Email</div>
      <div className='flex'>
        <Input
          defaultValue={props.user.email}
          className='flex-1'
          disabled />
        <Button onClick={() => setEditEmailModalVisible(true)} className='flex-none ml-5 px-5 max-w-36'>Edit</Button>
      </div>

      <div className='mt-5 mb-2 text-sm font-medium'>Bio</div>
      <div className='flex'>
        <Input
          defaultValue={props.user.bio}
          className='flex-1'
          disabled />
        <Button onClick={() => setEditBioModalVisible(true)} className='flex-none ml-5 px-5 max-w-36'>Edit</Button>
      </div>
      
      <EditUsernameModal
        currentUsername={props.user.username}
        visible={editUsernameModalVisible}
        onClose={() => setEditUsernameModalVisible(false)} />

      <EditPasswordModal
        visible={editPasswordModalVisible}
        onClose={() => setEditPasswordModalVisible(false)} />

      <EditDisplayNameModal
        currentDisplayName={props.user.display_name}
        visible={editDisplayNameModalVisible}
        onClose={() => setEditDisplayNameModalVisible(false)} />

      <EditEmailModal
        currentEmail={props.user.email}
        visible={editEmailModalVisible}
        onClose={() => setEditEmailModalVisible(false)} />

      <EditBioModal
        currentBio={props.user.bio}
        visible={editBioModalVisible}
        onClose={() => setEditBioModalVisible(false)} />

      <EditProfilePictureModal
        currentProfilePictureUrl={props.user_profile_picture?.url}
        visible={editProfilePictureModalVisible}
        onClose={() => setEditProfilePictureModalVisible(false)} />
    </div>
  );
};

export default MyProfile;
