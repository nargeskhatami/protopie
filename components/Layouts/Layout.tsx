import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
  footerInfo: FooterInfo;
  navigation: Menu[];
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { footerInfo, navigation, children } = props;

  return (
    <>
      <Navbar navigation={navigation} />
      <main>{children}</main>
      <Footer footerInfo={footerInfo} />
    </>
  );
}
