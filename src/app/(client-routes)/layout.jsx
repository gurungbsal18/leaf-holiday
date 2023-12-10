import ClientNavbar from "@/components/ClientNavbar";

export default function ClientLayout({ children }) {
  return (
    <div>
      <ClientNavbar />
      <main className="main-container">{children}</main>
    </div>
  );
}
