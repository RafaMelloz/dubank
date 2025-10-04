import { ToggleDarkMode } from "@/shared/components/toggle-dark-mode";
import { ToggleLayoutMode } from "@/shared/components/toggle-layout-mode";
import { BtnLogout } from "./components/btn-logout";

export default function AccountPage() {
  return (
    <>
      <div className="card">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Rafael M</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              rafaelmeloalvessouza@gmail.com
            </p>
          </div>
          <BtnLogout />
        </div>

        <div className="flex gap-2 mt-4">
          <ToggleDarkMode />
          <ToggleLayoutMode />
        </div>
      </div>

    </>
  );
}
