declare module 'aos' {
  export interface AOSOptions {
    duration?: number
    easing?: string
    once?: boolean
    offset?: number
    delay?: number
    anchor?: string
    anchorPlacement?: string
  }

  const aos: {
    init: (options?: AOSOptions) => void
    refresh: () => void
    refreshHard: () => void
  }
  export default aos
}
