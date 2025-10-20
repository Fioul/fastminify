'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Copy, Check, SiBitcoin, SiEthereum } from '@/lib/icons'
import { useTranslations } from '@/hooks/useTranslations'

interface CryptoModalProps {
  isOpen: boolean
  onClose: () => void
  locale: string
}

export default function CryptoModal({ isOpen, onClose, locale }: CryptoModalProps) {
  const { t } = useTranslations(locale)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  // Vos adresses crypto
  const addresses = {
    bitcoin: 'bc1qmed9nl6wtptuardqujdukkc25n4gz096ply9q6',
    ethereum: '0xFeFEAB8157acbcbbCC0fa14f49413364a518a594'
  }

  // Fonction pour masquer l'adresse (afficher les 6 premiers et 4 derniers caractères)
  const maskAddress = (address: string) => {
    if (address.length <= 10) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(type)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error('Failed to copy address:', err)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('support.methods.direct.crypto.title')}</DialogTitle>
          <DialogDescription>
            {t('support.methods.direct.description')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Bitcoin */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
              <SiBitcoin className="w-4 h-4 text-orange-500" />
              {t('support.methods.direct.crypto.bitcoin')}
            </h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={maskAddress(addresses.bitcoin)}
                readOnly
                className="flex-1 p-4 bg-muted border rounded text-base font-mono font-bold text-foreground cursor-default"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(addresses.bitcoin, 'bitcoin')}
                className="flex-shrink-0"
              >
                {copiedAddress === 'bitcoin' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Ethereum */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
              <SiEthereum className="w-4 h-4 text-blue-500" />
              {t('support.methods.direct.crypto.ethereum')}
            </h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={maskAddress(addresses.ethereum)}
                readOnly
                className="flex-1 p-4 bg-muted border rounded text-base font-mono font-bold text-foreground cursor-default"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(addresses.ethereum, 'ethereum')}
                className="flex-shrink-0"
              >
                {copiedAddress === 'ethereum' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
