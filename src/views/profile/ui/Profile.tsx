"use client"
import styles from "./Profile.module.scss"
import image from "@/public/avatar.svg"
import { BlockIcon } from "@/shared/assets/icons"
import Image from "next/image"
import { ReactNode, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

const posts = [
  { id: "3", url: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg", alt: "Міський вечір" },
  { id: "4", url: "https://images.unsplash.com/photo-1707345512638-997d31a10eaa", alt: "Зимовий ліс" },
  { id: "5", url: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg", alt: "Озеро в горах" },
  { id: "7", url: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg", alt: "Кавові зерна" },
  { id: "8", url: "https://images.unsplash.com/photo-1707345512638-997d31a10eaa", alt: "Архітектура міста" },
  { id: "9", url: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg", alt: "Полярне сяйво" },
  { id: "11", url: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg", alt: "Захід сонця" },
  { id: "12", url: "https://images.unsplash.com/photo-1707345512638-997d31a10eaa", alt: "Снігові вершини" },
  { id: "13", url: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg", alt: "Тварини в савані" },
  {
    id: "15",
    url: "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg",
    alt: "Тропічний ліс",
  },
]

const Profile = ({ userId, children }: { children?: ReactNode; userId: string }) => {
  const isMe = userId === "2test"
  const router = useRouter()

  const onCLickHandler = (postId: string) => {
    router.push(`/${userId}/${postId}`, { scroll: false })
  }

  const memoizedPosts = useMemo(() => {
    return (
      <>
        {posts.length > 0 ? (
          <div className={styles.postsList}>
            {posts.map((el) => (
              <div key={el.id}>
                <img
                  onClick={() => onCLickHandler(el.id)}
                  src={el.url}
                  alt={el.alt + el.id}
                  className={styles.postImage}
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            <span className={styles.divider} />
            <div className={styles.emptyPosts}>
              <BlockIcon size={45} />
              <h2>No Posts Yet</h2>
            </div>
          </>
        )}
      </>
    )
  }, [posts])

  return (
    <div className={styles.profile}>
      <div className={styles.head}>
        <Image src={image} alt={"User Avatar"} width={204} height={204} className={styles.avatar} />
        <div className={styles.profileInfo}>
          <div className={styles.navWrapper}>
            <h1>{userId}</h1>
            <>{isMe ? <button>isMe</button> : children}</>
          </div>
          <div className={styles.profileStats}>
            <div className={styles.statsItem}>
              <span>2218</span>
              <span>Following</span>
            </div>
            <div className={styles.statsItem}>
              <span>2358</span>
              <span>Followers</span>
            </div>
            <div className={styles.statsItem}>
              <span>2764</span>
              <span>Publications</span>
            </div>
          </div>
          <span className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </span>
        </div>
      </div>
      {memoizedPosts}
    </div>
  )
}

export default Profile
