import AdminNavbar from "@/components/AdminNavbar";

export default function ClientLayout({ children }) {
  return (
    <div className="d-flex">
      <AdminNavbar />
      <main className="main-container">{children}</main>
    </div>
  );
}
