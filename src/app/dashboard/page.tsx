import {getServerSession} from "next-auth"
import { redirect } from "next/navigation"

const Dashboard = async () => {
  
  const session = await getServerSession()
  
  if (!session) {
    redirect("/");
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-3xl mb-5">Tableau de bord</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, consequuntur. Recusandae aspernatur ducimus eligendi laborum asperiores explicabo itaque est rerum iure error iusto, eaque illo perspiciatis consectetur quisquam! Rerum, deserunt?</p>
    </div>
  )
}

export default Dashboard