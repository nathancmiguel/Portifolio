import { intlayer } from "vite-intlayer";
import { defineConfig, loadEnv, type Plugin } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getPinnedRepos } from './api/pinned.ts'

/**
 * Em dev, o Vite nao roda as funcoes de /api da Vercel.
 * Este plugin responde /api/pinned usando a mesma logica, com o
 * GITHUB_TOKEN lido do .env.local (que nao vai para o git).
 */
function pinnedApiDev(token: string | undefined): Plugin {
  return {
    name: 'pinned-api-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/pinned', async (_req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')

        if (!token) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'GITHUB_TOKEN nao configurado no .env.local' }))
          return
        }

        try {
          res.end(JSON.stringify(await getPinnedRepos(token)))
        } catch (error) {
          server.config.logger.error(`[api/pinned] ${String(error)}`)
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'Falha ao consultar o GitHub' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Prefixo '' carrega tambem variaveis sem VITE_ (ficam so no servidor, nao vao pro bundle)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), intlayer(), pinnedApiDev(env.GITHUB_TOKEN)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
