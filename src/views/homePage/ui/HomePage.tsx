import React from "react"
import styles from "./HomePage.module.scss"
import { user, usersPosts } from "@/views/homePage/lib/posts"
import Post from "@/views/homePage/ui/post/Post"

const HomePage = () => {
  const digits = String(234).padStart(6, "0")

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
        {usersPosts.map((el: user, index) => (
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
