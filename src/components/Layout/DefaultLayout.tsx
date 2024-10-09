import Navbar from "../Navbar/Navbar";

export default function DefaultLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full">
        <div>{children}</div>
      </main>
    </>
  );
}
