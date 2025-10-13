'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Mail, Github, Twitter } from 'lucide-react'

export default function ContactPage() {
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
      toast.error('Please fill in all required fields.')
      return
    }

    // Simulate form submission (in a real project, you would use an API)
    toast.success('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '', type: 'bug' })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground text-lg">
          Found a bug? Have a suggestion? We'd love to hear from you!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulaire de contact */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Send us a message</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="type">Type of message</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="question">Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  placeholder="Brief description"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Please describe your issue or suggestion in detail..."
                  className="min-h-[120px]"
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Informations de contact */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Get in touch</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We're always looking to improve FastMinify. Whether you've found a bug, 
                have a feature request, or just want to say hello, we'd love to hear from you.
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
              <h3 className="text-lg font-semibold">Common issues</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Minification not working?</h4>
                  <p className="text-muted-foreground">
                    Make sure your code is valid JavaScript or CSS. Check the browser console for errors.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Code not copying?</h4>
                  <p className="text-muted-foreground">
                    Try using the copy button or manually select and copy the text.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Theme not saving?</h4>
                  <p className="text-muted-foreground">
                    Check if your browser allows localStorage. Try refreshing the page.
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
