import { Link } from "react-router";

const Sidebar = () => {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-[#3e2723] text-[#d7ccc8] border-r border-[#2d1d1a]">
      <li className="mb-6">
        <h1 className="text-3xl font-bold text-[#d2b48c] tracking-widest font-mono">
          ATLAS
        </h1>
      </li>
      <li>
        <Link
          to="/dashboard"
          className="hover:bg-[#5d4037] hover:text-white active:bg-[#795548] focus:bg-[#5d4037]"
        >
          Projets
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/tasks"
          className="hover:bg-[#5d4037] hover:text-white active:bg-[#795548]"
        >
          Tâches
        </Link>
      </li>
      <div className="divider before:bg-[#5d4037] after:bg-[#5d4037] opacity-30" />
      <li>
        <Link
          to="/dashboard/profile"
          className="hover:bg-[#5d4037] hover:text-white"
        >
          Profil
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/settings"
          className="hover:bg-[#5d4037] hover:text-white"
        >
          Paramètres
        </Link>
      </li>
      <li className="mt-auto pt-4">
        <button
          type="button"
          className="btn border-[#795548] text-[#d2b48c] btn-outline hover:bg-[#c0392b] hover:border-[#c0392b] hover:text-white btn-sm transition-all duration-300"
        >
          Déconnexion
        </button>
      </li>
    </ul>
  );
};

export default Sidebar;
