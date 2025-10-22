import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, type, subject, message } = await request.json()

    // Validation des champs requis
    if (!name || !email || !type || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    // Traduction des types de messages
    const messageTypeTranslations: Record<string, string> = {
      contact: 'Demande de contact',
      feedback: 'Feedback',
      improvement: 'Idée d\'amélioration',
      bug: 'Rapport de bug'
    }

    const messageTypeLabel = messageTypeTranslations[type] || type

    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: 'FastMinify <onboarding@resend.dev>', // Email de test Resend
      to: [process.env.CONTACT_EMAIL || 'contact@fastminify.com'],
      subject: `[${messageTypeLabel}] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Nouveau message de contact</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">FastMinify - Formulaire de contact</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Informations du contact
              </h2>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #555; display: inline-block; width: 120px;">Nom :</strong>
                <span style="color: #333;">${name}</span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #555; display: inline-block; width: 120px;">Email :</strong>
                <span style="color: #333;">${email}</span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #555; display: inline-block; width: 120px;">Type :</strong>
                <span style="color: #667eea; font-weight: 500;">${messageTypeLabel}</span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #555; display: inline-block; width: 120px;">Sujet :</strong>
                <span style="color: #333;">${subject}</span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #555; display: block; margin-bottom: 10px;">Message :</strong>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #667eea; white-space: pre-wrap; color: #333; line-height: 1.6;">
                  ${message}
                </div>
              </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 4px; border-left: 4px solid #2196f3;">
              <p style="margin: 0; color: #1976d2; font-size: 14px;">
                <strong>💡 Conseil :</strong> Répondez directement à cet email pour contacter ${name}.
              </p>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">Message envoyé depuis le formulaire de contact de FastMinify</p>
            <p style="margin: 5px 0 0 0; opacity: 0.7;">© ${new Date().getFullYear()} FastMinify - Tous droits réservés</p>
          </div>
        </div>
      `,
      text: `
Nouveau message de contact - FastMinify

Nom: ${name}
Email: ${email}
Type: ${messageTypeLabel}
Sujet: ${subject}

Message:
${message}

---
Message envoyé depuis le formulaire de contact de FastMinify
      `,
    })

    if (error) {
      console.error('Erreur Resend:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id 
    })

  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
