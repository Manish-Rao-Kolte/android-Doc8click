import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {doctor} from './schemas/doctor/doctor';

export type RootNavParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Appointments: undefined;
  Profile: undefined;
  AuthNavigator: undefined;
  MyTabsNavigator: undefined;
  PdfViever: undefined;
  MovieHome: undefined;
  BookAppointment: {doctor: doctor};
  SpecialtyDoctors: {specialty?: string};
};

export type RootScreenProps<
  T extends keyof RootNavParamList = keyof RootNavParamList,
> = CompositeScreenProps<
  StackScreenProps<RootNavParamList, T>,
  BottomTabScreenProps<RootNavParamList, T>
>;

export interface TabBarIconProps {
  color: string;
  route: RootScreenProps<keyof RootNavParamList>['route'];
}

export type HeaderProps = {
  isHome: boolean;
  title: string;
  navigation: RootScreenProps<keyof RootNavParamList>['navigation'];
  cleanup?: () => void;
};

export type NavigationRouteTypes = {
  navigation: RootScreenProps<keyof RootNavParamList>['navigation'];
  route: any;
};
