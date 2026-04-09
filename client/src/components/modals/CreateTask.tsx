import { useState } from "react";
import type { Task } from "../ProjectDetails";

interface TaskModalProps {
  projectId: string | undefined;
  activeTab: string;
  onTaskCreated: (newTask: Task) => void;
}

const TaskModal = ({ projectId, activeTab, onTaskCreated }: TaskModalProps) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3310/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTask,
          status: activeTab,
          project_id: Number(projectId),
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        onTaskCreated(data); // On envoie la nouvelle tâche au parent
        setNewTask({ title: "", description: "", priority: "medium" });
        (document.getElementById("task_modal") as HTMLDialogElement)?.close();
      }
    } catch (err) {
      console.error("Erreur création tâche:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog id="task_modal" className="modal">
      <div className="modal-box bg-[#fdfaf6] border border-[#d2b48c] max-w-md">
        <h3 className="font-bold text-lg text-[#5c2e26] mb-6">
          Nouvelle tâche — <span className="capitalize">{activeTab}</span>
        </h3>

        <form onSubmit={handleCreateTask} className="space-y-4">
          <div className="form-control">
            <div className="label">
              <span className="label-text font-semibold text-[#795548]">
                Titre
              </span>
            </div>
            <input
              type="text"
              required
              maxLength={150}
              className="input input-bordered bg-white border-[#d2b48c] focus:outline-[#5c2e26]"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <div className="label">
              <span className="label-text font-semibold text-[#795548]">
                Priorité
              </span>
            </div>
            <select
              name="priority"
              className="select select-bordered bg-white border-[#d2b48c]"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="low">Faible 🟢</option>
              <option value="medium">Moyenne 🟡</option>
              <option value="high">Haute 🔴</option>
            </select>
          </div>

          <div className="form-control">
            <div className="label">
              <span className="label-text font-semibold text-[#795548]">
                Description
              </span>
            </div>
            <textarea
              maxLength={255}
              className="textarea textarea-bordered bg-white border-[#d2b48c] focus:outline-[#5c2e26] h-20"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>

          <div className="modal-action pt-4">
            <button
              type="button"
              className="btn btn-ghost text-[#a1887f]"
              onClick={() =>
                (
                  document.getElementById("task_modal") as HTMLDialogElement
                )?.close()
              }
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit btn bg-[#5c2e26] text-[#d2b48c] border-0 hover:bg-[#3e2723]"
            >
              {isSubmitting ? "Création..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button">Fermer</button>
      </form>
    </dialog>
  );
};

export default TaskModal;
