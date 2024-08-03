import mount from "./mount";

import Welcome from "./Welcome";
import TopNavBar from './TopNavBar';
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import MyProfile from "./MyProfile";
import Social from "./Social";
import User from "./Social/User";
import Collection from "./Collection";
import CollectionFaction from "./CollectionFaction";
import CollectionUserModel from "./CollectionUserModel";

import 'flowbite';

mount({
  Welcome,
  TopNavBar,
  SignInForm,
  SignUpForm,
  MyProfile,
  Collection,
  CollectionFaction,
  CollectionUserModel,
  Social,
  User
});
