import AdminNavbar from "@/components/AdminNavbar";

export default function ClientLayout({ children }) {
  return (
    <div className="d-flex main-container">
      <AdminNavbar />
      {children}
    </div>
  );
}
