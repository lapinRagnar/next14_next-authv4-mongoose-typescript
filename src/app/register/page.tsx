"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

const Register = () => {

  const [error, setError] = useState("")
  const router = useRouter()

  const { data: session, status: sessionStatus } = useSession()
  console.log("la session", session)

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard")
    }
  }, [sessionStatus, router])

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    if (!isValidEmail(email)) {
      setError("L'email est invalide!")
      return
    }

    if (!password || password.length < 4) {
      setError("Le mot de passe est invalide!")
      return
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (res.status === 400) {
        setError("Ce mail existe déjà!")
      }

      if (res.status === 200) {
        setError("");
        router.push("/login");
      }

    } catch (error) {
      setError("Erreur, veuillez reessayer!");
      console.log(error)
    }


  }

  if (sessionStatus === "loading") {
    return <h1 className="flex min-h-screen flex-col items-center justify-start p-24">Chargement en cour...</h1>
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#2e2e2e] p-8 rounded shadow-md w-[500px]">
        <h1 className="text-4xl text-center font-bold mb-8 uppercase">Creer Un Compte</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-green-400 focus:text-black"
            required 
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-green-400 focus:text-black"
            required 
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-blue-600"
          >
            {" "}
            Valider
          </button>

          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>

        </form>

        <div className="text-center text-gray-500 mt-4">- ou -</div>

        <Link
          href="/login"
          className="block text-center text-blue-500 hover:underline mt-4"
        >
          Vous avez déjà un compte
        </Link>

      </div>
    </div>
  )
}

export default Register