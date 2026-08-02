import { useEffect } from 'react'
import Hero from './components/Hero'
import './App.css'
import Logs from './components/Logs'
import { useIntlayer, useLocale } from 'react-intlayer'

function App() {
  const appContent = useIntlayer('app');
  const { locale } = useLocale();

  useEffect(() => {
    document.title = appContent.title.value;
    document.documentElement.lang = locale;
    
    // Atualiza a meta description padrao
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', appContent.description.value);
    }

    // Atualiza a meta do Open Graph também para as redes sociais
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', appContent.title.value);
    }
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', appContent.description.value);
    }
  }, [appContent.title.value, appContent.description.value, locale]);

  return (
    <main className="container">
      <Hero />
      <Logs />
    </main>
  )
}

export default App
