'use client'

import { useState } from 'react'

export function useAutoDetect() {
  const [autoDetectLeft, setAutoDetectLeft] = useState(true)
  const [autoDetectRight, setAutoDetectRight] = useState(true)
  const [leftTypeManuallySet, setLeftTypeManuallySet] = useState(false)
  const [rightTypeManuallySet, setRightTypeManuallySet] = useState(false)

  return {
    autoDetectLeft,
    autoDetectRight,
    leftTypeManuallySet,
    rightTypeManuallySet,
    setAutoDetectLeft,
    setAutoDetectRight,
    setLeftTypeManuallySet,
    setRightTypeManuallySet,
  }
}
