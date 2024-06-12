
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";


export const metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        {/* <Navbar/> */}
      <Settings/>
      </DefaultLayout>
    </>
  );
}