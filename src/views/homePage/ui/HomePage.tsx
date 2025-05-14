import React from "react"
import styles from "./HomePage.module.scss"
import image from "@/public/avatar.svg"
import Image from "next/image"

const HomePage = () => {
  const digits = String(234).padStart(6, "0")
  const posts = [
    {
      id: "123123",
      user_name: "test1",
      posts: [
        { id: "123456", photos: [image, image] },
        { id: "123", photos: [image] },
      ],
    },
    { id: "6754", user_name: "2test", posts: [{ id: "132454", photos: [image, image] }] },
    { id: "34534", user_name: "test3", posts: [{ id: "254366", photos: [image] }] },
    {
      id: "9878657",
      user_name: "4test",
      posts: [
        { id: "2345", photos: [image, image] },
        { id: "2345", photos: [image, image, image] },
        { id: "675463", photos: [image] },
      ],
    },
  ]

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.usersCounter}>
        <h2>Registered users:</h2>
        <div className={styles.digits}>
          {digits.split("").map((digit, index) => (
            <div key={index} className={styles.digit}>
              <span>{digit}</span>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.postsPils}>
        {posts.map((el, index) => (
          <div key={index}>
            <Image src={el.posts[0].photos[0]} alt={el.user_name} width={240} height={234} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage

//{String(count).padStart(6, "0")}
//-240 |234
