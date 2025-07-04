import React from "react"
import styles from "./HomePage.module.scss"
import Post from "@/views/homePage/ui/post/Post"
import { user } from "@/views/homePage/lib/types"

const HomePage = ({ users }: { users: user[] }) => {
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
        {users.slice(0, 4).map((el: user, index) => (
          <Post key={index} user={el} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
