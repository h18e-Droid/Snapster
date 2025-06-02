"use client"
import styles from "./Profile.module.scss"
import image from "@/public/avatar.svg"
import { BlockIcon } from "@/shared/assets/icons"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/ui/button"

const posts = [
  {
    id: "3",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKf6AIxapOMdJYTcj1FSWE5-UPSm99lxns5w&s",
    alt: "Міський вечір",
  },
  {
    id: "4",
    url: "https://etc.usf.edu/techease/wp-content/uploads/2017/12/daylily-flower-and-buds-sharp.jpg",
    alt: "Зимовий ліс",
  },
  {
    id: "5",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s",
    alt: "Озеро в горах",
  },
  {
    id: "7",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkJuhs3xtJ0V94n2PYF04yJ7JqFJ3Co7odWQ&s",
    alt: "Кавові зерна",
  },
  {
    id: "8",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQG91yBsrQHD23Y_QQ6bSh6ioZ3Gm3P4268g&s",
    alt: "Архітектура міста",
  },
  {
    id: "9",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCLgkClCDXpCTFNmbz7Mnzaq6xzL_xTXOBmg&s",
    alt: "Полярне сяйво",
  },
  {
    id: "11",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPFxqRYsT_F9tT7jc1mA4ZMYcd7Cs0GEMGAQ&s",
    alt: "Захід сонця",
  },
  {
    id: "12",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_G9U9095poYEIvtg8fnA2Ef3dcjLEebptQ&s",
    alt: "Снігові вершини",
  },
  {
    id: "13",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9EZNefY1fRsA4qVFTBviWyj-5KHY6U8LG0g&s",
    alt: "Тварини в савані",
  },
  {
    id: "15",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKHA1fc0BaYjm3o-Vf4QeoPNeTby5ERYEh3g&s",
    alt: "Тропічний ліс",
  },
]

const Profile = ({ userId, isAuth }: { userId: string; isAuth: boolean }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isMe, setIsMe] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUserId = localStorage.getItem("currentUserId")
    if (isAuth) {
      setIsMe(currentUserId === userId)
    } else {
      localStorage.removeItem("currentUserId")
    }
    setIsMounted(true)
  }, [userId])

  const navigateTo = (path: string) => {
    router.replace(path, { scroll: false })
  }

  return (
    <div className={styles.profile}>
      <div className={`${styles.headWrapper} ${isAuth ? styles.withButtons : styles.noButtons}`}>
        <div className={styles.avatarWrapper}>
          <Image src={image} alt={"User Avatar"} width={204} height={204} className={styles.avatar} />
        </div>
        <div className={styles.stats}>
          <div className={styles.statsItem}>
            <span>2218</span>
            <span onClick={() => isMe && navigateTo(`/${userId}/following`)}>Following</span>
          </div>
          <div className={styles.statsItem}>
            <span>2358</span>
            <span onClick={() => isMe && navigateTo(`/${userId}/followers`)}>Followers</span>
          </div>
          <div className={styles.statsItem}>
            <span>2764</span>
            <span>Publications</span>
          </div>
        </div>
        <h1 className={styles.userName}>{userId}</h1>
        <div className={styles.buttons}>
          {isMounted && isAuth ? (
            isMe ? (
              <>
                <Button variant={"secondary"}>Profile Settings</Button>
              </>
            ) : (
              <>
                <Button variant={"primary"}>Follow</Button>
                <Button variant={"secondary"}>Send Message</Button>
              </>
            )
          ) : null}
        </div>
        <span className={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua.
        </span>
      </div>
      <span className={styles.divider} />
      {posts.length > 0 ? (
        <div className={styles.postsList}>
          {posts.map((el) => (
            <div key={el.id}>
              <img
                onClick={() => navigateTo(`/${userId}/${el.id}`)}
                src={el.url}
                alt={el.alt + el.id}
                className={styles.postImage}
              />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.emptyPosts}>
            <BlockIcon size={45} />
            <h2>No Posts Yet</h2>
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
