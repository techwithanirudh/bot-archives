import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps<{
  tags: Record<string, number>
}> = async () => {
  const tags = await getAllTags('blog')

  return { props: { tags } }
}

export default function Home({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  const descriptions = [
    {
      name: 'AnirudhGPT',
      description:
        'A AI Comment Bot created by Anirudh Sriram. It uses the GPT-3.5 model to generate responses based on the question.',
    },
    {
      name: 'PikaBot2005',
      description:
        'A bot created by PikachuB2005. It uses the GPT-3.5 model to generate responses based on the question.',
    },
    {
      name: 'gdaybot',
      description:
        'A bot created by CodingMaster398. It uses the GPT-3.5 model to generate responses based on the question.',
    },
  ]
  return (
    <>
      <PageSEO title={`Home - ${siteMetadata.title}`} description="Things I blog about" />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="mono-type text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            BOTS
          </h1>
        </div>
        <ul className="flex flex-col space-y-4 py-3 w-full">
          {Object.keys(tags).length === 0 && 'No bots found.'}
          {sortedTags.map((t) => {
            return (
              <li
                key={t}
                className="flex flex-col sm:flex-row items-center justify-between w-full px-8 pt-10 pb-7 rounded-xl border border-gray-200 dark:border-gray-700 relative"
              >
                <Link
                  className="w-full h-full bg-transparent absolute top-0 left-0 md:hidden"
                  href={`/bots/${kebabCase(t)}`}
                ></Link>
                {/* <Tag text={t} /> */}
                <div className="sm:w-96 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center justify-between">
                    <Link
                      className="hover:underline text-xl md:text-3xl font-semibold mb-3 leading-snug"
                      href={`/bots/${kebabCase(t)}`}
                    >
                      {t.toUpperCase()}
                    </Link>
                  </div>
                  <p className="text-sm md:text-lg leading-relaxed mb-4">
                    {/* Get the descrptions from dict */}
                    {descriptions.map((d) => {
                      if (d.name.toLowerCase() === t.toLowerCase()) {
                        return d.description
                      }
                    })}
                  </p>
                </div>
                <div>
                  <Link href={`/bots/${kebabCase(t)}`} className="hover:underline">
                    <button className="bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 font-semibold rounded-lg text-gray-700 py-2 px-4 hidden md:block">
                      View Bot
                    </button>
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
