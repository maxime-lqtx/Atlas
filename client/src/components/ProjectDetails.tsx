import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TaskModal from "./modals/CreateTask";
import AddNewMember from "./modals/addNewMember";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: "todo" | "in_progress" | "done";
}

const ProjectDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<
    "todo" | "doing" | "done" | "prod"
  >("todo");
  const [loading, setLoading] = useState(true);

  const addNewTaskToList = (taskFromServer: Task) => {
    setTasks((prevTasks) => [...prevTasks, taskFromServer]);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/projects/${id}/tasks`,
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Erreur tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // console.log(tasks)

  // on filtre les tasks pour les onglets
  const filteredTasks = tasks.filter((task) => task.status === activeTab);

  if (loading)
    return <span className="loading loading-dots loading-lg text-[#5c2e26]" />;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#5c2e26] mb-6 font-mono">
          Tableau de bord du projet
        </h2>
        <button
          type="button"
          className="btn bg-[#5c2e26] text-[#d2b48c] border-0 hover:bg-[#3e2723]"
          onClick={() =>
            (
              document.getElementById("task_modal") as HTMLDialogElement
            )?.showModal()
          }
        >
          + Nouvelle Tâche
        </button>
      </div>
      <AddNewMember />
      <div role="tablist" className="tabs border-b-2 tabs-lifted tabs-lg mb-8">
        <button
          type="button"
          role="tab"
          className={`tab border-[#d2b48c] font-bold [--tab-border-color:#d2b48c] transition-all ${
            activeTab === "todo"
              ? "tab-active bg-[#5c2e26] text-[#d2b48c]! font-bold [--tab-bg:#5c2e26]"
              : "text-[#795548] hover:bg-[#ebd9c1]"
          }`}
          onClick={() => setActiveTab("todo")}
        >
          À faire
        </button>
        <button
          type="button"
          role="tab"
          className={`tab border-[#d2b48c] font-bold [--tab-border-color:#d2b48c] transition-all ${
            activeTab === "doing"
              ? "tab-active bg-[#5c2e26] text-[#d2b48c]! font-bold [--tab-bg:#5c2e26]"
              : "text-[#795548] hover:bg-[#ebd9c1]"
          }`}
          onClick={() => setActiveTab("doing")}
        >
          En cours
        </button>
        <button
          type="button"
          role="tab"
          className={`tab border-[#d2b48c] font-bold [--tab-border-color:#d2b48c] transition-all ${
            activeTab === "done"
              ? "tab-active bg-[#5c2e26] text-[#d2b48c]! font-bold [--tab-bg:#5c2e26]"
              : "text-[#795548] hover:bg-[#ebd9c1]"
          }`}
          onClick={() => setActiveTab("done")}
        >
          Terminé
        </button>
      </div>
      <div className="p-5 min-h-100 max-w-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="card bg-white border rounded-2xl border-[#ebd9c1] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`badge badge-sm border-0 font-bold ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="card-title text-[#5c2e26] text-lg leading-tight">
                    {task.title}
                  </h3>
                  <p className="text-[#8d6e63] text-sm line-clamp-3 mt-2 italic">
                    {task.description || "Aucune description fournie."}
                  </p>
                  <div className="card-actions justify-end mt-4 pt-4 border-t border-[#f5ebe0]">
                    <button
                      type="button"
                      className="btn btn-xs bg-[#5c2e26] text-[#d2b48c] border-0 hover:bg-[#3e2723]"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 opacity-50 italic text-[#795548]">
              Aucune tâche dans la catégorie "{activeTab}".
            </div>
          )}
        </div>
      </div>
      <TaskModal
        projectId={id}
        activeTab={activeTab}
        onTaskCreated={addNewTaskToList}
      />
    </div>
  );
};

export default ProjectDetails;
