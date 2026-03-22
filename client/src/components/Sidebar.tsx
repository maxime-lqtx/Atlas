import { Link } from "react-router";

const Sidebar = () => {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content border-r border-base-300">
      <li className="mb-4">
        <h1 className="text-2xl font-bold text-primary">ATLAS</h1>
      </li>
      <li>
        <Link to="/dashboard">Projets</Link>
      </li>
      <li>
        <Link to="/dashboard/tasks">Tâches</Link>
      </li>
      <div className="divider" />
      <li>
        <Link to="/dashboard/profile">Profil</Link>
      </li>
      <li>
        <Link to="/dashboard/profile">Paramètres</Link>
      </li>
      <li className="mt-auto">
        <button type="button" className="btn btn-error btn-outline btn-sm">
          Déconnexion
        </button>
      </li>
    </ul>
  );
};

export default Sidebar;
