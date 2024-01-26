import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex main-container gap-3">
      <AdminNavbar />
      {children}
    </div>
  );
}
