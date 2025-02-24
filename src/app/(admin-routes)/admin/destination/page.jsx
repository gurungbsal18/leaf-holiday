import AdminPages from "@/components/AdminPages";
import CreateDestination from "@/components/CreateComponents/CreateDestination";

export default function Destination() {
  const data = {
    pageName: "Destination",
    apiName: "destination",
    createComponent: <CreateDestination />,
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
