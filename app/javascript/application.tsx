import mount from "./mount";

import Welcome from "./Welcome";
import TopNavBar from './TopNavBar';
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import MyProfile from "./MyProfile";

import MyCollection from "./MyCollection";
import MyCollectionFaction from "./MyCollectionFaction";
import MyCollectionUserModel from "./MyCollectionUserModel";

import 'flowbite';

mount({
  Welcome,
  TopNavBar,
  SignInForm,
  SignUpForm,
  MyProfile,
  MyCollection,
  MyCollectionFaction,
  MyCollectionUserModel
});
