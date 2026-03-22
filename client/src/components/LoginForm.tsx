import type { FormEvent } from "react";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      if (!response.ok) throw new Error("Identifiants invalides");

      const result = await response.json();
      console.log("Succès:", result);
      navigate("#");
    } catch (err: unknown) {
      throw new Error("Erreur d'envoi au serveur !");
    }
  };

  return (
    <div className="card w-full max-w-md bg-white shadow-2xl border border-amber-100">
      <form className="card-body" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-amber-950 text-center mb-6">
          Connexion
        </h2>

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text text-amber-900 font-semibold">
              Email
            </span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="votre@email.com"
            className="input input-bordered border-amber-200 focus:border-amber-500 focus:outline-none"
            required
          />
        </div>

        <div className="form-control mt-4">
          <label className="label" htmlFor="password">
            <span className="label-text text-amber-900 font-semibold">
              Mot de passe
            </span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            className="input input-bordered border-amber-200 focus:border-amber-500 focus:outline-none"
            required
          />

          <div className="label">
            <a
              href="#forgot"
              className="label-text-alt link link-hover text-amber-700 font-medium"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        <div className="form-control text-center mt-8">
          <button
            type="submit"
            className="btn bg-amber-800 hover:bg-amber-900 text-white border-none rounded-xl"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}
