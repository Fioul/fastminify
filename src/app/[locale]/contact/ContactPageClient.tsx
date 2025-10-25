'use client'

import { useState } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  type: string
  subject: string
  message: string
}

interface ContactPageClientProps {
  locale: string
}

export default function ContactPageClient({ locale }: ContactPageClientProps) {
  const { t } = useTranslations(locale)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    type: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          type: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(t('contact.validation.error'))
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(t('contact.validation.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const messageTypes = [
    { value: 'contact', label: t('contact.messageTypes.contact') },
    { value: 'feedback', label: t('contact.messageTypes.feedback') },
    { value: 'improvement', label: t('contact.messageTypes.improvement') },
    { value: 'bug', label: t('contact.messageTypes.bug') }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.sendMessage')}</CardTitle>
                <CardDescription>
                  {t('contact.form.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        {t('contact.validation.success')}
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === 'error' && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errorMessage}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.name')} *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={t('contact.placeholders.name')}
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.email')} *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={t('contact.placeholders.email')}
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* Message Type Field */}
                  <div className="space-y-2">
                    <Label htmlFor="type">{t('contact.typeOfMessage')} *</Label>
                    <Select
                      name="type"
                      value={formData.type}
                      onValueChange={(value) => handleInputChange('type', value)}
                      autoComplete="off"
                      required
                    >
                      <SelectTrigger 
                        id="type"
                        ariaLabel={t('common.ariaLabels.selectOption')}
                      >
                        <SelectValue placeholder={t('contact.form.selectTypePlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {messageTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('contact.subject')} *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder={t('contact.placeholders.subject')}
                      autoComplete="off"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.message')} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder={t('contact.placeholders.message')}
                      autoComplete="off"
                      rows={6}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      t('contact.sendButton')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
