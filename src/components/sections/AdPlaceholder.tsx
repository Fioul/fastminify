'use client'

import { Button } from '@/components/ui/button'

interface AdPlaceholderProps {
  type: 'sidebar-left' | 'sidebar-right' | 'mobile-banner' | 'floating-banner'
  onClose?: () => void
  t: (key: string) => string
}

export default function AdPlaceholder({ type, onClose, t }: AdPlaceholderProps) {
  const getAdConfig = () => {
    switch (type) {
      case 'sidebar-left':
        return {
          className: 'hidden xl:block xl:col-span-2',
          containerClass: 'fixed top-28 left-12 z-30',
          size: 'w-[160px] h-[600px]',
          label: `${t('common.adSpace')}\n160x600`
        }
      case 'sidebar-right':
        return {
          className: 'hidden xl:block xl:col-span-2',
          containerClass: 'fixed top-28 right-12 z-30',
          size: 'w-[160px] h-[600px]',
          label: `${t('common.adSpace')}\n160x600`
        }
      case 'mobile-banner':
        return {
          className: 'mt-8 flex justify-center xl:hidden',
          containerClass: '',
          size: 'w-[320px] h-[50px]',
          label: `${t('common.adSpace')}\n320x50`
        }
      case 'floating-banner':
        return {
          className: 'fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t shadow-lg hidden xl:block',
          containerClass: 'container max-w-[1440px] mx-auto px-4 py-3',
          size: 'w-[728px] h-[90px]',
          label: `Floating ${t('common.adSpace')}\n728x90`,
          showClose: true
        }
      default:
        return {
          className: '',
          containerClass: '',
          size: 'w-[160px] h-[600px]',
          label: t('common.adSpace')
        }
    }
  }

  const config = getAdConfig()

  if (type === 'floating-banner') {
    return (
      <div className={config.className}>
        <div className={config.containerClass}>
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-center">
              <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-3 text-center">
                <div className="text-muted-foreground text-sm">
                  <div className={`${config.size} mx-auto bg-muted/30 rounded flex items-center justify-center`}>
                    <span className="text-xs whitespace-pre-line">{config.label}</span>
                  </div>
                </div>
              </div>
            </div>
            {config.showClose && onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-4 text-muted-foreground hover:text-foreground"
                aria-label={t('common.closeFloatingAd')}
              >
                ✕
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={config.className}>
      <div className={config.containerClass}>
        <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          <div className="text-muted-foreground text-sm">
            <div className={`${config.size} mx-auto bg-muted/30 rounded flex items-center justify-center`}>
              <span className="text-xs whitespace-pre-line">{config.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
