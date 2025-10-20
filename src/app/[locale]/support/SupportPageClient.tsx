'use client'

import { useTranslations } from '@/hooks/useTranslations'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
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
  ArrowRight
} from '@/lib/icons'

interface SupportPageClientProps {
  locale: string
}

export default function SupportPageClient({ locale }: SupportPageClientProps) {
  const { t } = useTranslations(locale)

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
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Heart className="w-4 h-4 mr-2" />
              {t('support.hero.badges.gratuit')}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Code className="w-4 h-4 mr-2" />
              {t('support.hero.badges.opensource')}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-2" />
              {t('support.hero.badges.community')}
            </Badge>
          </div>
        </div>

        {/* Why Support Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('support.why.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-warm">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t('support.why.hosting.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('support.why.hosting.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="card-warm">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t('support.why.development.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('support.why.development.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="card-warm">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t('support.why.features.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('support.why.features.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Methods Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('support.methods.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
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
                    onClick={() => window.open('https://github.com/sponsors/fastminify', '_blank')}
                  >
                    <Heart className="w-4 h-4 mr-3" />
                    GitHub Sponsors
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
                  className="btn-warm w-full h-12"
                  onClick={() => window.open('https://gomining.com/ref/fastminify', '_blank')}
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

        {/* Thank You Section */}
        <div className="text-center space-y-6">
          <div className="p-8 bg-primary/5 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">
              {t('support.thankyou.title')}
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('support.thankyou.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
