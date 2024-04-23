import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function Home() {
  return (
    <>
      <Helmet title="Home" />
      <article className="flex flex-1 flex-col items-center justify-center">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800 md:text-4xl">
          Bem-vindo ao
        </h2>
        <h1 className="mb-8 text-center text-4xl font-semibold text-gray-800 md:text-6xl">
          Gerência Dev
        </h1>
        <p className="mb-12 w-8/12 px-4 text-center text-lg text-gray-700 md:text-xl">
          Uma aplicação para cadastrar e gerenciar os níveis dos desenvolvedores
          do seu time!
        </p>
        <Button size="lg" asChild>
          <Link to="/desenvolvedores">Começar Agora</Link>
        </Button>
      </article>

      <p className="text-center">
        Desenvolvido por{' '}
        <a
          href="https://cadudev.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:underline"
        >
          Carlos Longhi
        </a>{' '}
        &copy; 2024. Todos os direitos reservados.
      </p>
    </>
  )
}
