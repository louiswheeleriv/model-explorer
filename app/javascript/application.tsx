import mount from "./mount";
import TopNavBar from './TopNavBar';
import FactionsTable from "./FactionsTable";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import MyCollections from "./MyCollections";
import SummaryProgressBar from "./SummaryProgressBar";
import SummaryProgressBarCard from "./SummaryProgressBarCard";

import 'flowbite';

mount({
  TopNavBar,
  FactionsTable,
  SignInForm,
  SignUpForm,
  MyCollections,
  SummaryProgressBar,
  SummaryProgressBarCard,
});
