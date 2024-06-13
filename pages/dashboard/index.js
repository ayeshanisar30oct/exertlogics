
import Settings from "./Settings";
import DefaultLayout from "./components/Layouts/DefaultLayout";



export const metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
      <Settings/>
      </DefaultLayout>
    </>
  );
}