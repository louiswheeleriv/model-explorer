import mount from "./mount";

import Welcome from "./Welcome";
import TopNavBar from './TopNavBar';
import FactionsTable from "./FactionsTable";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";

import MyCollection from "./MyCollection";
import StatusColorBar from "./StatusColorBar";
import SummaryProgressBar from "./SummaryProgressBar";
import SummaryProgressBarCard from "./SummaryProgressBarCard";
import GameSystemSection from "./MyCollection/GameSystemSection";
import FactionProgressBar from "./MyCollection/FactionProgressBar";

import 'flowbite';

mount({
  Welcome,
  TopNavBar,
  FactionsTable,
  SignInForm,
  SignUpForm,
  MyCollection,
  StatusColorBar,
  SummaryProgressBar,
  SummaryProgressBarCard,
  GameSystemSection,
  FactionProgressBar,
});
