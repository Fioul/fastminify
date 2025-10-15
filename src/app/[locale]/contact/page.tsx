'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Mail, Github, Twitter } from 'lucide-react'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = React.use(params)
  const isFrench = locale === 'fr'
  
  const t = {
    title: isFrench ? 'Contactez-nous' : 'Contact Us',
    subtitle: isFrench ? 'Vous avez trouvé un bug ? Une suggestion ? Nous aimerions vous entendre !' : 'Found a bug? Have a suggestion? We\'d love to hear from you!',
    sendMessage: isFrench ? 'Envoyez-nous un message' : 'Send us a message',
    name: isFrench ? 'Nom' : 'Name',
    email: isFrench ? 'Email' : 'Email',
    typeOfMessage: isFrench ? 'Type de message' : 'Type of message',
    subject: isFrench ? 'Sujet' : 'Subject',
    message: isFrench ? 'Message' : 'Message',
    sendButton: isFrench ? 'Envoyer le message' : 'Send Message',
    getInTouch: isFrench ? 'Entrer en contact' : 'Get in touch',
    getInTouchText: isFrench ? 'Nous cherchons toujours à améliorer FastMinify. Que vous ayez trouvé un bug, une demande de fonctionnalité, ou que vous vouliez simplement dire bonjour, nous aimerions vous entendre.' : 'We\'re always looking to improve FastMinify. Whether you\'ve found a bug, have a feature request, or just want to say hello, we\'d love to hear from you.',
    commonIssues: isFrench ? 'Problèmes courants' : 'Common issues',
    minificationNotWorking: isFrench ? 'La minification ne fonctionne pas ?' : 'Minification not working?',
    minificationNotWorkingText: isFrench ? 'Assurez-vous que votre code est un JavaScript ou CSS valide. Vérifiez la console du navigateur pour les erreurs.' : 'Make sure your code is valid JavaScript or CSS. Check the browser console for errors.',
    codeNotCopying: isFrench ? 'Le code ne se copie pas ?' : 'Code not copying?',
    codeNotCopyingText: isFrench ? 'Essayez d\'utiliser le bouton de copie ou sélectionnez et copiez manuellement le texte.' : 'Try using the copy button or manually select and copy the text.',
    themeNotSaving: isFrench ? 'Le thème ne se sauvegarde pas ?' : 'Theme not saving?',
    themeNotSavingText: isFrench ? 'Vérifiez si votre navigateur autorise localStorage. Essayez de rafraîchir la page.' : 'Check if your browser allows localStorage. Try refreshing the page.',
    messageTypes: {
      bug: isFrench ? 'Rapport de bug' : 'Bug Report',
      feature: isFrench ? 'Demande de fonctionnalité' : 'Feature Request',
      question: isFrench ? 'Question' : 'Question',
      other: isFrench ? 'Autre' : 'Other'
    },
    placeholders: {
      name: isFrench ? 'Votre nom' : 'Your name',
      email: isFrench ? 'votre@email.com' : 'your@email.com',
      subject: isFrench ? 'Brève description' : 'Brief description',
      message: isFrench ? 'Veuillez décrire votre problème ou suggestion en détail...' : 'Please describe your issue or suggestion in detail...'
    },
    validation: {
      required: isFrench ? 'Veuillez remplir tous les champs obligatoires.' : 'Please fill in all required fields.',
      success: isFrench ? 'Merci pour votre message ! Nous vous répondrons bientôt.' : 'Thank you for your message! We\'ll get back to you soon.'
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'bug'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t.validation.required)
      return
    }

    // Simulate form submission (in a real project, you would use an API)
    toast.success(t.validation.success)
    setFormData({ name: '', email: '', subject: '', message: '', type: 'bug' })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground text-lg">
          {t.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulaire de contact */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">{t.sendMessage}</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t.name} *</Label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    placeholder={t.placeholders.name}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t.email} *</Label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    placeholder={t.placeholders.email}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="type">{t.typeOfMessage}</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="bug">{t.messageTypes.bug}</option>
                  <option value="feature">{t.messageTypes.feature}</option>
                  <option value="question">{t.messageTypes.question}</option>
                  <option value="other">{t.messageTypes.other}</option>
                </select>
              </div>

              <div>
                <Label htmlFor="subject">{t.subject}</Label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  placeholder={t.placeholders.subject}
                />
              </div>

              <div>
                <Label htmlFor="message">{t.message} *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder={t.placeholders.message}
                  className="min-h-[120px]"
                />
              </div>

              <Button type="submit" className="w-full">
                {t.sendButton}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Informations de contact */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">{t.getInTouch}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t.getInTouchText}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">contact@fastminify.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">github.com/fastminify</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Twitter className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">@fastminify</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">{t.commonIssues}</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">{t.minificationNotWorking}</h4>
                  <p className="text-muted-foreground">
                    {t.minificationNotWorkingText}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">{t.codeNotCopying}</h4>
                  <p className="text-muted-foreground">
                    {t.codeNotCopyingText}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">{t.themeNotSaving}</h4>
                  <p className="text-muted-foreground">
                    {t.themeNotSavingText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
