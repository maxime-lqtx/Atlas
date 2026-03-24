import { useEffect, useState } from "react";
import { Link } from "react-router";
import CreateProject from "./modals/CreateProject";

interface Project {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3310/projects", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Impossible de récupérer les projets");
        }

        const data = await response.json();
        // console.log(data);
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue",
        );
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  // console.log(projects)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-dots loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="p-20">
      <div className="w-full">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl  font-bold font-mono">Mes Projets</h2>
            <p className="text-sm opacity-60">
              Gérez vos espaces de travail Atlas
            </p>
          </div>
          <button
            type="button"
            className="btn bg-[#5c2e26] text-[#d2b48c] btn-primary border-0  btn-sm md:btn-md"
            onClick={() =>
              (
                document.getElementById("create_modal") as HTMLDialogElement
              )?.showModal()
            }
          >
            + Nouveau Projet
          </button>
        </div>

        <div className="overflow-x-auto bg-[#fdfaf6] rounded-xl shadow-sm border border-[#d2b48c]">
          <table className="table w-full">
            <thead>
              <tr className="bg-[#5c2e26] text-[#d2b48c]">
                <th>Nom du Projet</th>
                <th className="hidden md:table-cell">Description</th>
                <th>Créé le</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-[#fcf3e8] border-b border-[#ebd9c1]"
                  >
                    <td>
                      <div className="font-bold text-[#795548]">
                        {project.title}
                      </div>
                    </td>
                    <td className="hidden md:table-cell opacity-80 text-[#8d6e63]">
                      {project.description || "—"}
                    </td>
                    <td className="text-[#a1887f]">
                      {new Date(project.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <th className="text-right">
                      <Link
                        to={`/dashboard/projects/${project.id}/tasks`}
                        className="btn btn-ghost btn-xs text-[#5d4037] hover:bg-[#d7ccc8]"
                      >
                        Ouvrir
                      </Link>
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 italic text-[#a1887f]"
                  >
                    Aucun projet trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <CreateProject />
    </div>
  );
};

export default ProjectList;
