import axios from 'axios'
import { useEffect, useState } from 'react'

interface FeedPostsProps {
  id: string
  permalink: string
  media_url: string
  media_type: "IMAGE" | "VIDEO"
}

export function Main() {
  const [feedPosts, setFeedPosts] = useState<FeedPostsProps[]>([])

  async function getPostsInstagram() {
    const token = import.meta.env.VITE_INSTA_TOKEN
    const fields = "media_url,media_type,permalink"
    const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`

    const { data } =  await axios.get(url)
    setFeedPosts(data.data)
  }

  useEffect(() => {
    getPostsInstagram()
  }, [])

  return (
    <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
      {feedPosts.map(item => (
        <a
          key={item.id}
          href={item.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className='h-72 overflow-hidden rounded-md transition-all hover:brightness-75'
        >
          {item.media_type === "VIDEO"
            ? (
                <video controls className='w-full h-full object-cover rounded-md'>
                  <source src={item.media_url} />
                </video>
              )
            : (
                <img src={item.media_url} className="w-full h-full object-cover rounded-md" />
              )
          }
        </a>
      ))}
    </main>
  )
}