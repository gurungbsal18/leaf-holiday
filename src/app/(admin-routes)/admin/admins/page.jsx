import AdminPages from "@/components/AdminPages";
import CreateAdmin from "@/components/CreateComponents/CreateAdmin";

export default function Admins() {
  const data = {
    pageName: "Admin",
    apiName: "user",
    createComponent: <CreateAdmin />,
    headerData: [
      { Header: "NAME", accessor: "name" },
      { Header: "EMAIL", accessor: "email" },
    ],
    showEdit: true,
    showRemove: true,
  };

  return (
    <div className="dashboard-content-section p-4">
      <AdminPages data={data} />
    </div>
  );
}
