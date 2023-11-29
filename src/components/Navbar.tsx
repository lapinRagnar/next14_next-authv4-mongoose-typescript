import Link from "next/link"

const Navbar = () => {
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
          <Link href="/login">
            <li>Login</li>
          </Link>
          <Link href="/register">
            <li>Créer un compte</li>
          </Link>
        </div>
      </ul>
    </div>
  )
}

export default Navbar