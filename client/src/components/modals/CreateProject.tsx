import { useState } from "react";

export default function CreateProject() {
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  return (
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
  );
}
