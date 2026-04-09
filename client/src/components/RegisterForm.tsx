import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      password: formData.get("password"),
      image_url: "http://test.com",
    };

    // console.log(payload)

    try {
      const response = await fetch("http://localhost:3310/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erreur lors de l'inscription");
      }

      navigate("/login");
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Une erreur est survenue",
      );
    }
  };
  return (
    <div className="card w-full max-w-lg rounded-xl bg-amber-950 shadow-amber-950 shadow-2xl p-3">
      <form className="card-body" onSubmit={handleRegister}>
        <h2 className="text-3xl font-bold text-amber-100 text-center m-10">
          Créer un compte
        </h2>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 text-center text-sm">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label" htmlFor="firstname">
              <span className="label-text text-amber-400 font-semibold">
                Prénom
              </span>
            </label>
            <input
              name="firstname"
              type="text"
              placeholder="Jean"
              className="input input-bordered border-amber-200 focus:border-amber-500 bg-amber-100 focus:outline-none"
              required
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="lastname">
              <span className="label-text text-amber-400 font-semibold">
                Nom
              </span>
            </label>
            <input
              name="lastname"
              type="text"
              placeholder="Dupont"
              className="input input-bordered border-amber-200 focus:border-amber-500 bg-amber-100 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="form-control flex flex-col mt-4">
          <label className="label" htmlFor="email">
            <span className="label-text text-amber-400 font-semibold">
              Email
            </span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="votre@email.com"
            className="input input-bordered border-amber-200 bg-amber-100 focus:border-amber-500 focus:outline-none"
            required
          />
        </div>

        <div className="form-control flex flex-col mt-4">
          <label className="label" htmlFor="password">
            <span className="label-text text-amber-400  font-semibold">
              Mot de passe
            </span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="Minimum 8 caractères"
            className="input input-bordered border-amber-200 bg-amber-100 focus:border-amber-500 focus:outline-none"
            required
          />
        </div>

        <div className="form-control mt-4">
          <label className="label" htmlFor="image_url">
            <span className="label-text text-amber-400 font-semibold">
              Photo de profil
            </span>
          </label>
          <input
            name="image_url"
            type="file"
            className="file-input file-input-bordered w-full border-amber-200 focus:outline-none file:bg-amber-100 file:text-amber-800 file:border-none"
            accept="image/*"
          />
        </div>

        <div className="form-control text-center mt-8">
          <button
            type="submit"
            className="btn bg-amber-800 hover:bg-amber-900 text-white border-none rounded-xl"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}
