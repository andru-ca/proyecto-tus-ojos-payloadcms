'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,           // duración animación
      easing: 'ease-out-cubic',
      once: true,              // 🔥 solo una vez
      offset: 120,             // distancia antes de activar
    })
  }, [])

  return null
}