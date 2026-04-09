import { useState } from "react";

export default function CreateProject() {
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newProject.title.trim()) {
      setError("Le titre du projet est obligatoire");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3310/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
        credentials: "include",
      });

      if (response.ok) {
        const modal = document.getElementById("create_modal") as HTMLDialogElement;
        modal?.close();
        setNewProject({ title: "", description: "" });
        window.location.reload();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erreur lors de la création");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog id="create_modal" className="modal">
      <div className="modal-box bg-[#fdfaf6] border border-[#d2b48c]">
        <h3 className="font-bold text-lg mb-4 text-[#5c2e26]">
          Créer un nouveau projet
        </h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleCreateProject}>
          <div className="form-control w-full mb-4">
            <div className="label">
              <span className="label-text text-[#795548]">Nom du projet</span>
            </div>
            <input
              type="text"
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
              onClick={() => {
                setError(null);
                (document.getElementById("create_modal") as HTMLDialogElement)?.close();
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn submit bg-[#5c2e26] hover:bg-[#3e2723] text-[#d2b48c] border-0 ${isSubmitting ? "loading" : ""}`}
            >
              {isSubmitting ? "Création..." : "Créer le projet"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={() => setError(null)}>close</button>
      </form>
    </dialog>
  );
}