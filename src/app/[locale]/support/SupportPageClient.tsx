'use client'

import { useState } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import CryptoModal from '@/components/CryptoModal'
import GoMiningModal from '@/components/GoMiningModal'
import { 
  Heart, 
  Coffee, 
  Gift, 
  ExternalLink, 
  Info,
  Code,
  Server,
  Zap,
  Users,
  Shield,
  ArrowRight,
  SiBitcoin,
  SiEthereum
} from '@/lib/icons'

interface SupportPageClientProps {
  locale: string
}

export default function SupportPageClient({ locale }: SupportPageClientProps) {
  const { t } = useTranslations(locale)
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false)
  const [isGoMiningModalOpen, setIsGoMiningModalOpen] = useState(false)

  return (
    <div className="gradient-bg">
      <div className="container max-w-[1600px] mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Heart className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('support.hero.title')}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('support.hero.subtitle')}
          </p>
        </div>

        {/* Why Support Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('support.why.title')}
          </h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-warm">
              <CardHeader className="flex flex-row items-start space-y-0 space-x-4">
                <div className="flex-shrink-0 pt-1">
                  <Server className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-lg">{t('support.why.hosting.title')}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {t('support.why.hosting.description')}
                  </p>
                </div>
              </CardHeader>
            </Card>

            <Card className="card-warm">
              <CardHeader className="flex flex-row items-start space-y-0 space-x-4">
                <div className="flex-shrink-0 pt-1">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-lg">{t('support.why.development.title')}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {t('support.why.development.description')}
                  </p>
                </div>
              </CardHeader>
            </Card>

            <Card className="card-warm">
              <CardHeader className="flex flex-row items-start space-y-0 space-x-4">
                <div className="flex-shrink-0 pt-1">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-lg">{t('support.why.features.title')}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {t('support.why.features.description')}
                  </p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Support Methods Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('support.methods.title')}
          </h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Direct Support */}
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="w-6 h-6 text-primary" />
                  {t('support.methods.direct.title')}
                </CardTitle>
                <CardDescription>
                  {t('support.methods.direct.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Button 
                    variant="outline" 
                    className="btn-outline-hover justify-start h-12"
                    onClick={() => window.open('https://paypal.me/fastminify', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-3" />
                    PayPal
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="btn-outline-hover justify-start h-12"
                    onClick={() => window.open('https://buymeacoffee.com/fastminify', '_blank')}
                  >
                    <Coffee className="w-4 h-4 mr-3" />
                    Buy Me a Coffee
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="btn-outline-hover justify-start h-12"
                    onClick={() => setIsCryptoModalOpen(true)}
                  >
                    <SiBitcoin className="w-4 h-4 mr-3" />
                    {t('support.methods.direct.crypto.title')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Indirect Support via GoMining */}
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-6 h-6 text-primary" />
                  {t('support.methods.indirect.title')}
                </CardTitle>
                <CardDescription>
                  {t('support.methods.indirect.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setIsGoMiningModalOpen(true)}
                >
                  <Gift className="w-4 h-4 mr-3" />
                  {t('support.methods.indirect.button')}
                  <ArrowRight className="w-4 h-4 ml-3" />
                </Button>
                
                {/* Disclaimer Alert */}
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    {t('support.methods.indirect.disclaimer')}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Crypto Modal */}
        <CryptoModal 
          isOpen={isCryptoModalOpen}
          onClose={() => setIsCryptoModalOpen(false)}
          locale={locale}
        />

        {/* GoMining Modal */}
        <GoMiningModal 
          isOpen={isGoMiningModalOpen}
          onClose={() => setIsGoMiningModalOpen(false)}
          locale={locale}
        />
      </div>
    </div>
  )
}
