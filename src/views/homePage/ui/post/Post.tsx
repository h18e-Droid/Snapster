"use client"
import React, { useEffect, useRef, useState } from "react"
import styles from "./Post.module.scss"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { PersonIcon } from "@/shared/assets/icons"

const Post = ({ user }: { user: any }) => {
  const [expanded, setExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const router = useRouter()

  const postTextRef = useRef<HTMLParagraphElement>(null)
  const postRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (postRef.current && !postRef.current.contains(event.target as Node)) {
      setExpanded(false)
    }
  }

  useEffect(() => {
    const checkIsLong = () => {
      const el = postTextRef.current
      if (el) {
        const isOverflowing = el.scrollHeight > el.clientHeight
        setIsClamped(isOverflowing)
      }
    }
    checkIsLong()
    window.addEventListener("resize", checkIsLong)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("resize", checkIsLong)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const redirectToProfile = () => {
    router.push(`/${user.id}`, { scroll: true })
  }

  //должно быть сначала user.id а потом post.id
  const redirectToPost = () => {
    router.push(`/${user.id}/${user.id}`)
  }

  return (
    <div className={styles.wrapper}>
      <div style={{ minHeight: "40%" }}>
        <img
          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9h1WL3OXQRn1X4Kyg9fR4EUEbXf91EZJDhA&s"}
          alt={user.userName}
          className={styles.postImage}
          onClick={redirectToPost}
        />
      </div>
      <div style={{ minHeight: "134px" }}>
        <div className={`${styles.postInfo} ${expanded ? styles.expanded : ""}`} ref={postRef}>
          <div className={styles.avatar}>
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.userName}
                width={36}
                height={36}
                style={{ borderRadius: "50%" }}
                onClick={redirectToProfile}
              />
            ) : (
              <div className={styles.icon}>
                <PersonIcon size={30} />
              </div>
            )}
            <h3 onClick={redirectToProfile}>{user.userName}</h3>
          </div>
          <span ref={postTextRef} className={`${styles.postText} ${expanded ? styles.expandedText : ""}`}>
            {user.bio}
          </span>

          <span className={styles.toggleButton} onClick={() => setExpanded(!expanded)}>
            {isClamped && (expanded ? "hide" : "more")}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Post
