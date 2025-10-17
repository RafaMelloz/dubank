import { ToggleDarkMode } from "@/shared/components/toggle-dark-mode";
import { ToggleLayoutMode } from "@/shared/components/toggle-layout-mode";
import { BtnLogout } from "./components/btn-logout";
import { auth } from "@/shared/libs/better-auth/auth";
import { headers } from "next/headers";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <div className="card">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{session?.user?.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 decoration-0">
              {session?.user?.email}
            </p>
          </div>
          <BtnLogout />
        </div>

        <div className="flex gap-4 mt-4">
          <ToggleDarkMode />
          <ToggleLayoutMode />
        </div>
      </div>
    </>
  );
}
