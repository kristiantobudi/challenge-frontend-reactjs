import { Settings } from "../Quiz/settings/setting";

export default function Navbar() {
  const { handleLogout } = Settings();

  return (
    <header className="relative">
      <div className="fixed top-0 right-0 flex w-full bg-white shadow-sm">
        <div className="flex items-center justify-end flex-grow px-4 py-4 shadow-sm md:px-6 xl:px-11">
          <div>
            <button
              type="submit"
              onClick={handleLogout}
              className="w-full px-5 py-2 text-sm font-bold text-center text-white rounded-lg sm:text-sm lg:text-lg bg-lime-500 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime -300 sm:w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
