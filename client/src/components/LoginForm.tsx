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
    <div className="card w-full max-w-md shadow-2xl border bg-amber-950 border-amber-300">
      <form className="card-body items-center" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-amber-100 text-center mb-6">
          Connexion
        </h2>

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text text-amber-400  font-semibold">
              Email
            </span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="votre@email.com"
            className="input input-bordered text-amber-950 border-amber-200  bg-amber-100 focus:outline-none"
            required
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="password">
            <span className="label-text text-amber-400  font-semibold">
              Mot de passe
            </span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            className="input input-bordered text-amber-950 focus:border-amber-500 bg-amber-100 focus:outline-none"
            required
          />
        </div>

        <div className="label">
          <a
            href="#forgot"
            className="label-text-alt link link-hover text-amber-600 font-medium"
          >
            Mot de passe oublié ?
          </a>
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
