import mount from "./mount";

import Welcome from "./Welcome";
import TopNavBar from './TopNavBar';
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";

import MyCollection from "./MyCollection";
import StatusColorBar from "./common/StatusColorBar";
import SummaryProgressBar from "./common/SummaryProgressBar";
import SummaryProgressBarCard from "./common/SummaryProgressBarCard";
import GameSystemSection from "./MyCollection/GameSystemSection";
import FactionProgressBar from "./MyCollection/FactionProgressBar";
import MyCollectionFaction from "./MyCollectionFaction";

import 'flowbite';

mount({
  Welcome,
  TopNavBar,
  SignInForm,
  SignUpForm,
  MyCollection,
  StatusColorBar,
  SummaryProgressBar,
  SummaryProgressBarCard,
  GameSystemSection,
  FactionProgressBar,
  MyCollectionFaction,
});
