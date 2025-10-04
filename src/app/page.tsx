"use client"

import { login, LoginSchema, signup, SignupSchema } from "@/shared/schemas/auth-schema";
import { LogIn, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signUp } from "@/shared/libs/better-auth/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const [typeForm, setTypeForm] = useState<"login" | "signup">("login");
  const router = useRouter();

  const {
    register, //Função que conecta um campo HTML ao React Hook Form.
    handleSubmit, //Função que lida com o envio do formulário.
    formState: { errors }, //Objeto onde ficam todos os erros de validação, organizados por campo.
    control,
    reset, // Função para resetar o formulário
  } = useForm<LoginSchema | SignupSchema>({
    resolver: zodResolver(typeForm === "login" ? login : signup) //Integra o Zod com o React Hook Form para validação.
  });

  async function onSubmit(data: LoginSchema | SignupSchema) {

    if (typeForm === "login") {
      try {
        await signIn.email({
          email: data.email,
          password: data.password,
        });
        router.push("/home/wallet");
      } catch (error) {
        console.error("Erro no login:", error);
      }
    } 
    
    if (typeForm === "signup") {
      const signupData = data as SignupSchema;
      try {
        await signUp.email({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
        });
        router.push("/home/wallet");
      } catch (error) {
        console.error("Erro no cadastro:", error);
      }
    }
  }

  return (
    <main className="h-dvh flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Formulário de Login */}
        {typeForm === "login" && (
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Entrar
              </h2>

              <button className="btn" type="button" onClick={() => setTypeForm("signup")}>
                <UserRoundPlus />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="input"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn w-full">
                Entrar
              </button>
            </form>
          </div>
        )}

        {/* Formulário de Cadastro */}
        {typeForm === "signup" && (
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Criar conta
              </h2>

              <button className="btn" type="button" onClick={() => setTypeForm("login")}>
                <LogIn />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="input"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="input"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  minLength={8}
                  {...register("password")}
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="w-full btn">
                Criar Conta
              </button>
            </form>
          </div>
        )}        
      </div>
    </main>
  );
}

{/* <form action={loginAction} className="space-y-4">
  <div>
    <label
      htmlFor="login-email"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      Email
    </label>
    <input
      type="email"
      id="login-email"
      name="email"
      required
      className="input"
      placeholder="seu@email.com"
    />
  </div>
  <div>
    <label
      htmlFor="login-password"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      Senha
    </label>
    <input
      type="password"
      id="login-password"
      name="password"
      required
      className="input"
      placeholder="••••••••"
    />
  </div>
  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
  >
    Entrar
  </button>
</form> */}
