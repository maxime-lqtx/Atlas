import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // console.log(data);

    try {
      const response = await fetch("http://localhost:3310/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Identifiants invalides");
      }

      const result = await response.json();
      localStorage.setItem("user", JSON.stringify(result.user));
      console.log("Succès:", result);
      navigate("/Dashboard");
    } catch (err: unknown) {
      console.error("Détail de l'erreur:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Une erreur est survenue",
      );
    }
  };

  return (
    <div className="card w-full flex flex-col items-center max-w-md p-8 rounded-xl bg-amber-950 shadow-amber-950 shadow-2xl">
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-amber-100 text-center mb-6">
          Connexion
        </h2>

        {errorMsg && (
          <div className="w-full max-w-xs bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 text-center text-sm">
            {errorMsg}
          </div>
        )}

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="email">
            <span className="label-text text-amber-400 font-semibold">
              Email
            </span>
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="votre@email.com"
            className="input text-amber-950 border-amber-200 bg-amber-100 focus:outline-none w-full"
            required
          />
        </div>

        <div className="form-control w-full max-w-xs mt-2">
          <label className="label" htmlFor="password">
            <span className="label-text text-amber-400 font-semibold">
              Mot de passe
            </span>
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="••••••••"
            className="input input-bordered text-amber-950 focus:border-amber-500 bg-amber-100 focus:outline-none w-full"
            required
          />
        </div>

        <div className="w-full max-w-xs mt-2">
          <a
            href="#forgot"
            className="label-text-alt link link-hover text-amber-600 font-medium"
          >
            Mot de passe oublié ?
          </a>
        </div>

        <div className="w-full max-w-xs mt-8">
          <button
            type="submit"
            className="btn w-full bg-amber-800 hover:bg-amber-900 text-white border-none rounded-xl"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}
