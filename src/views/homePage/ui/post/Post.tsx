"use client"
import React, { useState } from "react"
import styles from "./Post.module.scss"
import { user } from "@/views/homePage/lib/posts"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Post = ({ user }: { user: user }) => {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const isLong = user.desc.length > 100
  const displayedText = expanded || !isLong ? user.desc : user.desc.slice(0, 95) + "..."

  const redirectToProfile = () => {
    router.push(`/${user.userName}`)
  }

  const redirectToPost = () => {
    router.push(`/${user.userName}/${user.posts[0].id}`)
  }

  return (
    <div className={styles.postWrapper}>
      <Image src={user.posts[0].photos[0]} alt={user.userName} className={styles.postImage} onClick={redirectToPost} />

      <div className={`${styles.post} ${expanded ? styles.expanded : styles.collapsed}`}>
        <div className={styles.avatar}>
          <Image
            src={user.avatar}
            alt={user.userName}
            width={36}
            height={36}
            style={{ borderRadius: "50%" }}
            onClick={redirectToProfile}
          />
          <h3 onClick={redirectToProfile}>{user.userName}</h3>
        </div>

        <span className={styles.postText}>
          {displayedText}
          {isLong && (
            <span className={styles.toggleButton} onClick={() => setExpanded(!expanded)}>
              {expanded ? "Hide" : "Show more"}
            </span>
          )}
        </span>
      </div>
    </div>
  )
}

export default Post
