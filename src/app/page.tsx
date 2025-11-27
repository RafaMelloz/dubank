"use client"

import { login, LoginSchema, signup, SignupSchema } from "@/shared/schemas/auth-schema";
import { LoaderCircle, LogIn, SplineIcon, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signUp } from "@/shared/libs/better-auth/auth-client";
import { errorToast } from "@/shared/libs/react-hot-toast/react-hot-toast";

export default function Home() {
  const [typeForm, setTypeForm] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    if (typeForm === "login") {
      const response = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
        callbackURL: '/home/wallet'
      });

      if (response?.error) {
        errorToast('Credenciais inválidas. Por favor, tente novamente.');
        setIsLoading(false);
        return;
      }
    } 
    
    if (typeForm === "signup") {
      const signupData = data as SignupSchema;
        const response = await signUp.email({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        callbackURL: '/home/wallet',
      });

      if (response?.error) {
        errorToast('Erro ao criar conta. Por favor, tente novamente.');
        setIsLoading(false);
        return;
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

              <button className="btn disabled:opacity-50" disabled={isLoading} type="button" onClick={() => setTypeForm("signup")}>
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
              <button type="submit" className="btn w-full disabled:opacity-50" disabled={isLoading}>
                { isLoading ? 'Entrando' : 'Entrar' }
                { isLoading && <LoaderCircle className="h-4 w-4 animate-spin" /> }
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

              <button className="btn disabled:opacity-50" disabled={isLoading} type="button" onClick={() => setTypeForm("login")} >
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
              <button type="submit" className="btn w-full disabled:opacity-50" disabled={isLoading}>
                { isLoading ? 'Criando' : 'Criar conta' }
                { isLoading && <LoaderCircle className="h-4 w-4 animate-spin" /> }
              </button>
            </form>
          </div>
        )}        
      </div>
    </main>
  );
}