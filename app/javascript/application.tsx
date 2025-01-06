import mount from "./mount";

import Welcome from "./Welcome";
import TopNavBar from './TopNavBar';
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import ForgotPasswordForm from "./auth/ForgotPasswordForm";
import PasswordResetForm from "./auth/PasswordResetForm";
import MyProfile from "./MyProfile";
import Social from "./Social";
import User from "./Social/User";
import Explore from "./Explore";
import GameSystemDetail from "./Explore/GameSystemDetail";
import FactionDetail from "./Explore/FactionDetail";
import ModelDetail from "./Explore/ModelDetail";
import Collection from "./Collection";
import CollectionFaction from "./CollectionFaction";
import CollectionUserModel from "./CollectionUserModel";

import 'flowbite';

mount({
  Welcome,
  TopNavBar,
  SignInForm,
  SignUpForm,
  ForgotPasswordForm,
  PasswordResetForm,
  MyProfile,
  Collection,
  CollectionFaction,
  CollectionUserModel,
  Social,
  User,
  Explore,
  GameSystemDetail,
  FactionDetail,
  ModelDetail
});
