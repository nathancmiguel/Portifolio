export default defineAppConfig({
  ui: {
    colors: {
      primary: 'red',
      neutral: 'neutral',
    },
    colorMode: {
      preference: 'light',
    },
    button: {
      slots: {
        base: 'rounded-none'
      }
    }   
  }
})