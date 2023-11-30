import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";


export const POST = async (request: any) => {
  const { password, email } = await request.json()

  await connect()

  const existingUser = await User.findOne({ email })

  const hashedPassword = await bcrypt.hash(password, 5)
  existingUser.password = hashedPassword

  existingUser.resetToken = undefined
  existingUser.resetTokenExpiry = undefined

  try {
    await existingUser.save()
    return new NextResponse("Le mot de passe a bien été modifié!", { status: 200 })
  } catch (error: any) {
    return new NextResponse(error, { status: 500 })
  }

}