
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        {/* <ECommerce /> */}
        <Navbar/>
        <Footer/>
      </DefaultLayout>
    </>
  );
}
