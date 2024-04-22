import { Helmet } from 'react-helmet-async'

export function Home() {
  return (
    <>
      <Helmet title="Home" />

      <div className="flex flex-1 items-center justify-center">
        <article className="flex flex-col items-center gap-8">
          <h1 className="text-6xl font-medium">Gerência Dev</h1>
          <p className="text-lg">
            Aplicação para cadastrar e gerenciar os Níveis dos Desenvolvedores
            do seu time!
          </p>
        </article>
      </div>
      <p className="text-center">
        Desenvolvido por{' '}
        <a
          href="https://cadudev.vercel.app/"
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
