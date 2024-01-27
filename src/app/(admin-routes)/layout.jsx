import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex main-container">
      <AdminNavbar />
      {children}
    </div>
  );
}
