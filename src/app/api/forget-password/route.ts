import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

import crypto from 'crypto'
import sgMail from '@sendgrid/mail'

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

  const body = "Reinitialisez votre mot de passe en cliquant sur ce lien : " + resetUrl

  const msg = {
    to: email,
    from: 'lapinragnar@gmail.com',
    subject: 'Reinitialisez votre mot de passe',
    text: body
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "")

  sgMail.send(msg).then(() => {
    return new NextResponse("Email envoyé avec succès", { status: 200 })
  }).catch(async (error) => {
    existingUser.resetToken = undefined
    existingUser.resetTokenExpiry = undefined
    await existingUser.save()

    return new NextResponse("Une erreur est survenue (mail non envoyé), veuillez reessayer", { status: 400 })
  })

  try {
    await existingUser.save()
    return new NextResponse("Email envoyé avec succès, pour changer votre mot de passe", { status: 200 })
  } catch (error: any) {
    return new NextResponse(error, { status: 500 })
  }


}