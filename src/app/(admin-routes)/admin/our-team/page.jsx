import AdminPages from "@/components/AdminPages";
import CreateTeam from "@/components/CreateComponents/CreateTeam";

export default function AdminOurTeam() {
  const data = {
    pageName: "Team Member",
    apiName: "ourTeam",
    createComponent: <CreateTeam />,
    headerData: [
      { Header: "NAME", accessor: "name" },
      { Header: "POSITION", accessor: "designation" },
    ],
    showView: true,
    showEdit: true,
    showRemove: true,
    showImage: true,
  };

  return (
    <div className="dashboard-content-section p-4">
      <AdminPages data={data} />
    </div>
  );
}
