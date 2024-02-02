import AdminNavbar from "@/components/AdminNavbar";
import Notification from "@/components/Notification";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex main-container">
      <AdminNavbar />
      {children}
      <Notification />
    </div>
  );
}
