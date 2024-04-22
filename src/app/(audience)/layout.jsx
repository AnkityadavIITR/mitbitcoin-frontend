import Navbar from "@/components/navbar";
export default function RootLayout({ children }) {
  return (
    <main className="w-full h-full">
      <Navbar />
      {children}
    </main>
  );
}
