import AdminPages from "@/components/AdminPages";
import CreateActivity from "@/components/CreateComponents/CreateActivity";

export default function Activity() {
  const data = {
    pageName: "Activitie",
    apiName: "activity",
    createComponent: <CreateActivity />,
    headerData: [
      { Header: "NAME", accessor: "name" },
      { Header: "DESCRIPTION", accessor: "description" },
    ],
    showView: true,
    showEdit: true,
    showRemove: true,
    showImage: true,
  };

  return (
    <div className="dashboard-content-section p-4">
      <div className="destination-page">
        <AdminPages data={data} />
      </div>
    </div>
  );
}
