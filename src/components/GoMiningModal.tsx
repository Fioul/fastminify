'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Check, ExternalLink, Info, Zap, Shield, DollarSign, Clock } from '@/lib/icons'
import { useTranslations } from '@/hooks/useTranslations'

interface GoMiningModalProps {
  isOpen: boolean
  onClose: () => void
  locale: string
}

export default function GoMiningModal({ isOpen, onClose, locale }: GoMiningModalProps) {
  const { t } = useTranslations(locale)
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const referralLink = 'https://gomining.com/?ref=WNJQTRC'
  const referralCode = 'WNJQTRC'

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(item)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {t('support.methods.indirect.modal.title')}
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            {t('support.methods.indirect.modal.subtitle')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* What is GoMining */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                {t('support.methods.indirect.modal.whatIs.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('support.methods.indirect.modal.whatIs.description')}
              </p>
            </CardContent>
          </Card>

          {/* How it works and Benefits - Side by side */}
          <div className="grid md:grid-cols-5 gap-6">
            {/* How it works */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {t('support.methods.indirect.modal.howItWorks.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    <span className="text-muted-foreground">{t('support.methods.indirect.modal.howItWorks.step1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    <span className="text-muted-foreground">{t('support.methods.indirect.modal.howItWorks.step2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    <span className="text-muted-foreground">{t('support.methods.indirect.modal.howItWorks.step3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </span>
                    <span className="text-muted-foreground">{t('support.methods.indirect.modal.howItWorks.step4')}</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  {t('support.methods.indirect.modal.benefits.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{t('support.methods.indirect.modal.benefits.item1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{t('support.methods.indirect.modal.benefits.item2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{t('support.methods.indirect.modal.benefits.item3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{t('support.methods.indirect.modal.benefits.item4')}</span>
                  </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    {t('support.methods.indirect.modal.benefits.item5')}
                    <span className="text-xs italic text-muted-foreground/70 block mt-1">
                      {t('support.methods.indirect.modal.benefits.item5Note')}
                    </span>
                  </div>
                </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Referral Section */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Shield className="w-5 h-5" />
                {t('support.methods.indirect.modal.referral.title')}
              </CardTitle>
              <CardDescription>
                {t('support.methods.indirect.modal.referral.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-primary">
                    {t('support.methods.indirect.modal.referral.bonus')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('support.methods.indirect.modal.referral.condition')}
                </p>
                <div className="bg-primary/10 p-3 rounded-lg border-l-4 border-primary">
                  <p className="text-sm text-primary font-medium">
                    {t('support.methods.indirect.modal.referral.support')}
                  </p>
                </div>
              </div>

              {/* Referral Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('support.methods.indirect.modal.referral.code')}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={referralCode}
                    readOnly
                    className="flex-1 p-3 bg-muted border rounded text-base font-mono font-bold text-foreground cursor-default"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(referralCode, 'code')}
                    className="flex-shrink-0"
                  >
                    {copiedItem === 'code' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Referral Link */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('support.methods.indirect.modal.referral.link')}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 p-3 bg-muted border rounded text-sm font-mono text-foreground cursor-default"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(referralLink, 'link')}
                    className="flex-shrink-0"
                  >
                    {copiedItem === 'link' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {t('support.methods.indirect.modal.disclaimer')}
            </AlertDescription>
          </Alert>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 h-12 bg-primary hover:bg-primary/90"
              onClick={() => window.open(referralLink, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('support.methods.indirect.modal.cta')}
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={onClose}
            >
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
