"use client"
import React from "react"
import styles from "./Profile.module.scss"
import Image from "next/image"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { user } from "@/views/profile/lib/types"
import { PersonIcon } from "@/shared/assets/icons"
import Posts from "./posts/Posts"

const Profile = ({ user }: { user: user }) => {
  const currentUserId = useAppSelector((state) => state.user.userId)
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  const isMe = user.id === currentUserId

  return (
    <div className={styles.profile}>
      <div
        className={`${styles.headWrapper} ${isAuth ? styles.withButtons : styles.noButtons}`}
        style={isAuth ? { paddingBottom: "30px" } : {}}
      >
        <div className={styles.avatarWrapper}>
          {user.avatarUrl ? (
            <Image src={user.avatarUrl} alt={"User Avatar"} width={204} height={204} className={styles.avatar} />
          ) : (
            <div className={styles.avatar} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <PersonIcon size={180} />
            </div>
          )}
        </div>
        <div className={styles.stats}>
          <Link
            href={`/${user.id}/following`}
            onClick={isMe ? undefined : (e) => e.preventDefault()}
            className={styles.statsItem}
            style={isMe ? {} : { cursor: "default" }}
            scroll={false}
            replace
          >
            <span>{user.following}</span>
            <span>Following</span>
          </Link>
          <Link
            href={`/${user.id}/followers`}
            onClick={isMe ? undefined : (e) => e.preventDefault()}
            className={styles.statsItem}
            style={isMe ? {} : { cursor: "default" }}
            scroll={false}
            replace
          >
            <span>{user.followers}</span>
            <span>Followers</span>
          </Link>
          <div className={styles.statsItem} style={{ cursor: "default" }}>
            <span>{user.publications}</span>
            <span>Publications</span>
          </div>
        </div>
        <h1 className={styles.userName}>{user.userName}</h1>
        <div className={styles.buttons}>
          {isAuth && currentUserId ? (
            isMe ? (
              <Link href={"/settings"}>
                <Button variant={"secondary"}>Profile Settings</Button>
              </Link>
            ) : (
              <>
                <Button variant={"primary"}>Follow</Button>
                <Button variant={"secondary"}>Send Message</Button>
              </>
            )
          ) : null}
        </div>
        <span className={styles.bio}>{user.bio}</span>
      </div>
      <span className={styles.divider} />
      <Posts />
    </div>
  )
}

export default Profile
