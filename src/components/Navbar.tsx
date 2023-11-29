"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

const Navbar = () => {

  const { data: session }: any = useSession()
  console.log("la session dans la navbar", session)

  return (
    <div>
      <ul className="flex justify-between m-10 items-center">
        <div>
          <Link href="/">
            <li>Accueil</li>
          </Link>
        </div>
        <div className="flex gap-5">

          <Link href="/dashboard">
            <li>Tableau de bord</li>
          </Link>

          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>

              <Link href="/register">
                <li>Créer un compte</li>
              </Link>
            </>
          ):(
            <>

              <div className="text-green-500">
                ({session.user?.email})
              </div>

              <li>

                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-1 bg-red-800 rounded-full"
                >
                  Se Deconnecter
                </button>

              </li>
            </>
          )}

        </div>
      </ul>
    </div>
  )
}

export default Navbar