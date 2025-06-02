import React from "react"
import styles from "./HomePage.module.scss"
import Post from "@/views/homePage/ui/post/Post"
import { usersPosts } from "@/views/homePage/lib/posts"

const HomePage = ({ users }: { users: unknown[] }) => {
  const digits = String(users.length).padStart(6, "0")

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
      <div className={styles.postsList}>
        {usersPosts.slice(0, 4).map((el: unknown, index) => (
          <Post key={index} user={el} />
        ))}
      </div>
    </div>
  )
}

export default HomePage

//{String(count).padStart(6, "0")}
//-240 |234
//1.67
