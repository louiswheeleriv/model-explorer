import mount from "./mount";

import TopNavBar from './TopNavBar';
import FactionsTable from "./FactionsTable";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";

import MyCollections from "./MyCollections";
import StatusColorBar from "./StatusColorBar";
import SummaryProgressBar from "./SummaryProgressBar";
import SummaryProgressBarCard from "./SummaryProgressBarCard";
import GameSystemSection from "./MyCollections/GameSystemSection";
import FactionProgressBar from "./MyCollections/FactionProgressBar";

import 'flowbite';

mount({
  TopNavBar,
  FactionsTable,
  SignInForm,
  SignUpForm,
  MyCollections,
  StatusColorBar,
  SummaryProgressBar,
  SummaryProgressBarCard,
  GameSystemSection,
  FactionProgressBar,
});
