import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

import crypto from 'crypto'

export const POST = async (request: any) => {
  const { email } = await request.json()

  await connect()

  const existingUser = await User.findOne({ email })

  if (!existingUser) {
    return new NextResponse("Ce mail n'existe pas!", { status: 400 })
  }

  const resetToken = crypto.randomBytes(20).toString('hex')
  const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  const passwordResetExpires = Date.now() + 3600000 // 1 hour

  existingUser.resetToken = passwordResetToken
  existingUser.resetTokenExpiry = passwordResetExpires

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`

  console.log("url du reset password = ",resetUrl)

}