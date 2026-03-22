import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-amber-100">
      <nav className="navbar container mx-auto bg-base-100 px-4 py-4">
        <div className="flex-1">
          <a
            href="/"
            className="btn btn-ghost text-3xl font-black tracking-tighter text-amber-950"
          >
            ATLAS
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="hidden items-center font-bold gap-10 sm:flex">
            <a href="/login" className=" border-0 bg-0 text-amber-950">
              Login
            </a>
            <a
              href="/register"
              className="btn bg-amber-800 text-white px-8 rounded-xl hover:bg-amber-900 border-none"
            >
              Register
            </a>
          </div>
          <div className="dropdown dropdown-end sm:hidden">
            <button
              type="button"
              className="btn btn-ghost btn-circle text-amber-950"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Mobile Menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            <ul className="menu dropdown-content menu-sm z-1 mt-3 w-52 rounded-box bg-white p-2 shadow border border-amber-200">
              <li>
                <a href="/login" className="text-amber-950">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-amber-950">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="hero min-h-[70vh] bg-amber-950 text-amber-50">
        <div className="hero-content container mx-auto flex-col gap-12 px-6 lg:flex-row-reverse">
          <img
            alt="Dashboard interactif montrant la gestion de projet"
            src="https://plus.unsplash.com/premium_photo-1661764570116-b1b0a2da783c?q=80&w=1170&auto=format&fit=crop"
            className="max-w-lg rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 w-full border-4 border-amber-800"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-extrabold leading-tight md:text-6xl text-white">
              Gérez vos projets en{" "}
              <span className="text-amber-400">toute simplicité</span>
            </h1>
            <p className="mx-auto py-8 text-lg opacity-90 max-w-md lg:mx-0 text-amber-100">
              Retrouvez tous vos projets et tâches au même endroit pour une
              productivité décuplée.
            </p>
            <button
              type="button"
              className="btn bg-amber-500 text-amber-950 btn-lg shadow-lg rounded-xl hover:bg-amber-600 border-none font-bold"
            >
              Commencer l'aventure
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-amber-50 py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center gap-16 lg:flex-row">
              <div className="w-full lg:w-1/2">
                <img
                  alt="Équipe travaillant sur un projet"
                  src="https://plus.unsplash.com/premium_photo-1661319176563-899bd5c62838?q=80&w=1470&auto=format&fit=crop"
                  className="w-full rounded-2xl shadow-xl border-4 border-amber-200"
                />
              </div>
              <div className="w-full space-y-6 lg:w-1/2">
                <h2 className="text-4xl font-bold text-amber-950">
                  Un contrôle total
                </h2>
                <p className="text-lg italic text-amber-800/80">
                  "La meilleure façon de prédire l'avenir, c'est de le créer."
                </p>
                <p className="text-lg leading-relaxed text-amber-900">
                  Centralisez vos communications, suivez l'avancement en temps
                  réel et ne manquez plus aucune deadline.
                </p>
                <div className="divider border-amber-300" />
                <div className="stats w-full shadow bg-white border border-amber-100">
                  <div className="stat place-items-center">
                    <div className="stat-title text-amber-700">
                      Productivité
                    </div>
                    <div className="stat-value text-amber-600">+40%</div>
                  </div>
                  <div className="stat place-items-center">
                    <div className="stat-title text-amber-700">
                      Utilisateurs
                    </div>
                    <div className="stat-value text-amber-800">10k+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-24 text-center">
          <h2 className="mb-4 text-4xl font-black uppercase tracking-widest text-amber-950">
            Nos Services
          </h2>
          <div className="mx-auto mb-16 h-1 w-24 bg-amber-500" />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Planification",
                img: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=1374",
              },
              {
                title: "Collaboration",
                img: "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1386",
              },
              {
                title: "Analyse",
                img: "https://plus.unsplash.com/premium_photo-1683141154082-324d296f3c66?q=80&w=1470",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group card border border-amber-100 bg-white shadow-xl transition-all hover:border-amber-300 hover:shadow-2xl"
              >
                <figure className="overflow-hidden px-6 pt-6">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-48 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-110 border border-amber-100"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title justify-center text-2xl font-bold text-amber-950">
                    {item.title}
                  </h3>
                  <p className="text-amber-800/80">
                    Optimisez chaque étape de votre flux de production.
                  </p>
                  <div className="card-actions mt-4 justify-center">
                    <button
                      type="button"
                      className="btn btn-outline bg-white text-amber-800 border-amber-800 hover:bg-amber-800 hover:text-white hover:border-amber-800 btn-sm"
                    >
                      En savoir plus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer footer-center bg-amber-950 p-10 text-amber-100 ">
        <nav className="grid grid-flow-col gap-8">
          <a
            href="#about"
            className="link link-hover font-semibold text-amber-100 hover:text-amber-300"
          >
            À propos
          </a>
          <a
            href="#contact"
            className="link link-hover font-semibold text-amber-100 hover:text-amber-300"
          >
            Contact
          </a>
          <a
            href="#jobs"
            className="link link-hover font-semibold text-amber-100 hover:text-amber-300"
          >
            Carrières
          </a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-6">
            <a
              href="https://twitter.com"
              className="transition-colors hover:text-amber-400 text-amber-100"
              aria-label="Twitter"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <title>Twitter</title>
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              className="transition-colors hover:text-amber-400 text-amber-100"
              aria-label="YouTube"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <title>YouTube</title>
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p className="opacity-70 text-amber-200">
            Copyright © {new Date().getFullYear()} - Atlas Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default App;
