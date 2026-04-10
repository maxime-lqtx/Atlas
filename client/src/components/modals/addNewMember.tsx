import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function NewMemberModal() {
  // j'ai besoin de quoi ?
  // project_id, user_id de la personne qu'on ajoute
  const projectId = useParams();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);

  // console.log(projectId);
  console.log(users);
  console.log(error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3310/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // fonction de creation de member
  // recup les infos et fais l'envoi des data au backend
  async function addNewMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const inputValue = (formElement.elements[0] as HTMLInputElement).value;
    console.log(inputValue);

    try {
      const response = await fetch(
        `http://localhost:3310/projects/${projectId.id}/members`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: inputValue }),
          credentials: "include",
        },
      );
      if (response.ok) {
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  }

  return (
    <>
      <form onSubmit={addNewMember} className="join flex justify-end">
        <div>
          <label className="input validator join-item p-0">
            <input
              type="text"
              className="border-2 border-amber-950 p-2 mr-0.5 "
              placeholder="mail@site.com"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="btn bg-[#5c2e26] text-[#d2b48c] border-0 hover:bg-[#3e2723]"
        >
          Ajouter un membre
        </button>
      </form>
    </>
  );
}
