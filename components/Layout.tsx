import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactElement } from "react";

export const Layout = ({
  navigation,
  settings,
  withHeaderDivider = false,
  withProfile = false,
  withSignUpForm = false,
  children,
}: {
    navigation: string,
    settings: any,
    withHeaderDivider?: boolean;
    withProfile?: boolean;
    withSignUpForm?: boolean;
    children: ReactElement
}) => {
  return (
    <div className="text-slate-700">
      <Header
        withProfile={withProfile}
        withDivider={withHeaderDivider}
        navigation={navigation}
        settings={settings}
      />
      <main>
        <div id="parchment"></div>
        <div id="contain">{children}</div>
      </main>
      <Footer withSignUpForm={withSignUpForm} settings={settings} />
    </div>
  );
};
