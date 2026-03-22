import { useEffect, useState } from "react";
import { Link } from "react-router";

interface Project {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const ProjectList = () => {
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3310/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
        credentials: "include",
      });

      if (response.ok) {
        // on ferme la modale
        const modal = document.getElementById(
          "create_modal",
        ) as HTMLDialogElement;
        modal?.close();

        // on reboot le form
        setNewProject({ title: "", description: "" });
        window.location.reload();
      }
    } catch (err) {
      console.error("Erreur création:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                        to={`/dashboard/project/${project.id}`}
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
      <dialog id="create_modal" className="modal">
        <div className="modal-box bg-[#fdfaf6] border border-[#d2b48c]">
          <h3 className="font-bold text-lg mb-4 text-[#5c2e26]">
            Créer un nouveau projet
          </h3>
          <form onSubmit={handleCreateProject}>
            <div className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text text-[#795548]">Nom du projet</span>
              </div>
              <input
                type="text"
                required
                className="input input-bordered w-full bg-white border-[#d2b48c] focus:border-[#5c2e26]"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
              />
            </div>
            <div className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text text-[#795548]">
                  Description (optionnel)
                </span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full bg-white border-[#d2b48c] focus:border-[#5c2e26]"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost text-[#a1887f]"
                onClick={() =>
                  (
                    document.getElementById("create_modal") as HTMLDialogElement
                  )?.close()
                }
              >
                Annuler
              </button>
              <button
                type="submit"
                className={`btn bg-[#5c2e26] hover:bg-[#3e2723] text-[#d2b48c] border-0 ${isSubmitting ? "loading" : ""}`}
              >
                Créer le projet
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button">close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProjectList;
