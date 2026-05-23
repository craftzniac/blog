import type { Route } from "./+types/home";
import z from "zod"
import path from "path"
import fs from "fs/promises"
import fsSync from "fs"
import IconGithub from "~/components/IconGithub";
import { Link, useLocation } from "react-router";
import ReactMarkdown from "react-markdown"
import matter from "gray-matter";
import CodeBlock from "~/components/CodeBlock";
import IconLink from "~/components/IconLink";
import { useEffect } from "react";

function generateId(length: number = 20): string {
  const pool = "abcdefghijklmnopqrstuvwxyz0123456789-"
  let id = ""
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * length)
    id += pool[index]
  }
  return id
}

// // NOTE: Slug is better supplied directly in the markdown article itself so that it is stable across builds of the website

// function createSlug(_title: string): string {
//   const title = `${_title.trim()}`.toLowerCase()
//   let slug = ""
//
//   for (let i = 0; i < title.length; i++) {
//     let char = title[i]
//     if (char == " ") {
//       char = "-"
//     }
//     slug += char
//   }
//   return slug
// }

export function meta({ }: Route.MetaArgs) {
  return [
    { title: `craftzniac://(b)log` },
    { name: "description", content: "My daily software engineering adventures" },
  ];
}

const metaSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  slug: z.string().trim().regex(/^[a-z0-9_-]+$/, { error: "Invalid slug. Slug must be all lowercase letters and must contain no space(s) between words (use - or _ inplace of spaces)" })
}).required()

type TPost = {
  id: string,
  meta: z.infer<typeof metaSchema>,
  content: string
}

export async function loader(): Promise<{ posts: Array<TPost> }> {
  const contentFolderPath = path.resolve(".", "content")
  if (fsSync.existsSync(contentFolderPath) == false) {
    return { posts: [] }
  }

  const folderContent = await fs.readdir(contentFolderPath, { encoding: "utf-8" })
  // take only markdown files
  const mdFilesList = folderContent.filter(it => it.endsWith(".md"))

  // grab the content of each .md file
  const posts: Array<TPost & { filename: string }> = []

  for (const filename of mdFilesList) {
    const filePath = path.resolve(contentFolderPath, filename)
    const filecontent = await fs.readFile(filePath, { encoding: "utf-8" })
    // const { data, content } = matter("--- \ntitle: hello there\ndatte: 323232\n---\n\nSome other thing")
    const { data, content } = matter(filecontent)

    const result = metaSchema.safeParse(data)
    if (result.error) {
      const metaDataErrs = z.treeifyError(result.error)

      const errProps: Record<string, string[]> = {}
      if (metaDataErrs.properties) {
        if ("title" in metaDataErrs?.properties) { errProps.title = metaDataErrs.properties.title?.errors || [] }
        if ("date" in metaDataErrs?.properties) { errProps.date = metaDataErrs.properties.date?.errors || [] }
        if ("slug" in metaDataErrs?.properties) { errProps.slug = metaDataErrs.properties.slug?.errors || [] }
        if ("description" in metaDataErrs?.properties) { errProps.description = metaDataErrs.properties.description?.errors || [] }
      }

      throw new Error(`\n\nInvalid metadata fields in file: ${filename}: ${JSON.stringify(errProps)}\n\n`)
    }

    // check for duplicate slugs
    for (let post of posts) {
      if (result.data.slug == post.meta.slug) {
        throw new Error(`\n\nFile ${filename} has the same slug as file ${post.filename}. Slugs must be unique for each file/post\n\n`)
      }
    }

    const postId = generateId()
    const postMeta = result.data
    posts.push({ id: postId, meta: postMeta, content, filename: filename })

  }

  // sort posts according to date
  posts.sort((a, b) => {
    if (a.meta.date > b.meta.date) return -1
    if (a.meta.date < b.meta.date) return 1
    return 0
  })

  // remove the filename property from posts before returning them
  return { posts: posts.map(post => ({ id: post.id, meta: post.meta, content: post.content })) }

}


export default function Home({ loaderData }: Route.ComponentProps) {

  const posts = loaderData.posts
  return (
    <div className="flex flex-col h-full w-full">
      <ScrollToHash />
      <Header />
      <main className="w-full h-full flex justify-center overflow-auto">
        {
          posts.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center p-4 max-w-200 prose prose-lg dark:prose-invert">
              <h1 className="text-center w-full opacity-50">Craftzniac has no posts yet</h1>
            </div>
          ) : (
            <ul className="flex flex-col gap-40 md:gap-50 w-full p-4 max-w-250">
              {posts.map(post => <li key={post.id}>
                <Post post={post} />
              </li>)}
            </ul>
          )
        }
      </main>
    </div>
  )

}

function Post({ post }: { post: TPost }) {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
  const date = dateFormatter.format(post.meta.date)
  {/*<article id={post.slug} className="prose prose-slate dark:prose-invert">*/ }
  return (
    <article id={post.meta.slug} className="prose prose-sm md:prose-lg dark:prose-invert max-w-240 flex flex-col gap-0 w-full">
      <div className="flex flex-col gap-1 w-full">
        <p className="text-gray-700 dark:text-gray-500 font-bold">{date}</p>
        <h1><a href={`#${post.meta.slug}`} className="no-underline hover:underline font-bold flex items-center gap-[0.5em] [&>svg]:min-w-5 [&>svg]:min-h-5 md:[&>svg]:min-w-10 md:[&>svg]:min-h-10">
          <div className="hidden md:block">
            <IconLink />
          </div>
          <span>{post.meta.title}</span>
        </a></h1>
      </div>
      <div className="m-0 p-0">
        {/* @ts-ignore */}
        <ReactMarkdown components={{ code: CodeBlock }}>{post.content}</ReactMarkdown>
        { /*<ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post.content}</ReactMarkdown> */}
      </div>
    </article>
  )

}

function Header() {
  const githubLink = "https://github.com/craftzniac"
  return (
    <header className="p-4 flex items-center gap-4 justify-between">
      <Link to="/" className="font-bold">craftzniac://(b)log</Link>
      <Link to={githubLink} target="_blank" className="p-1 cursor-pointer">
        <IconGithub className="w-6 h-6" />
      </Link>
    </header>
  )
}

function ScrollToHash() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) return
    const articleId = location.hash.slice(1)

    requestAnimationFrame(() => {
      const element = document.getElementById(articleId)
      if (element) {
        element.scrollIntoView({ behavior: "instant", block: "start" })
      }
    })
  }, [location])
  return null
}
