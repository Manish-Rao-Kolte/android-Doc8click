import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type RootNavParamList = {
    Splash: undefined;
    Login: undefined;
    Signup: undefined;
    BottomTabNavigator: undefined;
    Home: undefined;
    Appointments: undefined;
    Profile: undefined;
};

export type RootScreenProps<T extends keyof RootNavParamList = keyof RootNavParamList> = CompositeScreenProps<
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
};