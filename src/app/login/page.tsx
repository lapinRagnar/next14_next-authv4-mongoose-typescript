"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession()
  console.log("la session", session)

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard")
    }
  }, [sessionStatus, router])

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    if (!isValidEmail(email)) {
      setError("Le mail est invalide!")
      return
    }

    if (!password || password.length < 4) {
      setError("Le mot de passe est invalide!")
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Le email ou le mot de passe est incorrect!");
      if (res?.url) router.replace("/dashboard")
    } else {
      setError("")
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Chargement en cour...</h1>
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#2e2e2e] p-8 rounded shadow-md w-[500px]">
          <h1 className="text-4xl text-center font-semibold mb-8 uppercase">Se Connecter</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Se Connecter
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <button
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={() => { signIn("github") }}
          >
            Se connecter avec Github
          </button>
          <div className="text-center text-gray-500 mt-4">- ou -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/register"
          >
            Vous n&apos;avez pas encore un compte?
          </Link>
        </div>
      </div>
    )
  );
};

export default Login