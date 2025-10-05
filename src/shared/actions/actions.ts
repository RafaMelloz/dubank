"use server";

import { auth } from "@/shared/libs/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    if (response?.user) {
      redirect("/home/wallet");
    }
  } catch (error) {
    console.error("Erro no login:", error);
    // Silenciosamente falha e recarrega a página
    // Em produção, você pode adicionar query params para mostrar erro
  }
}

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    if (response?.user) {
      redirect("/home/wallet");
    }
  } catch (error) {
    console.error("Erro no cadastro:", error);
    // Silenciosamente falha e recarrega a página
    // Em produção, você pode adicionar query params para mostrar erro
  }
}
