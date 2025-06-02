import styles from "./MyProfile.module.scss"
import Image from "next/image"
import img from "public/photogirl.png"
import Link from "next/link"
import HeaderInfoUser from "@/views/myProfile/headerInfoUser/HeaderInfoUser"
import Posts from "@/views/myProfile/posts/Posts"
import { UserData } from "@/app/(private)/myProfile/[id]/page"



const MyProfile = ({userName, ...rest}: UserData) => {
  const numberFollowing = {
    userName,
    following: 12254,
    followers: 12254,
    publications: 4521,
  }
  const auth = true
  const verified = true
  return (
    <div className={styles.wrapperMyProfile}>
      <div className={styles.headerMyProfile}>
        <div className={styles.headerPhotoUser}>
          <Image src={img} alt={"photo user"} width={204} height={204} className={styles.img} />
        </div>
        <div className={styles.headerInfoUser}>
          <HeaderInfoUser data={numberFollowing} auth ={auth} verified={verified}/>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco{" "}
              <Link href={"#"}>laboris nisi ut aliquip ex ea commodo consequat.</Link>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.foterMyProfile}>
        <Posts/>
      </div>
    </div>
  )
}

export default MyProfile
