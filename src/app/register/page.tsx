import Link from "next/link"

const Register = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#2e2e2e] p-8 rounded shadow-md w-[500px]">
        <h1 className="text-4xl text-center font-bold mb-8 uppercase">Creer Un Compte</h1>
        <form >
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