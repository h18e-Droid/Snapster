
import styles from "./Post.module.scss"
import Image, { StaticImageData } from "next/image"
import { Button } from "@/shared/ui/button"

type Props = {
  image: StaticImageData
}

const Post = ({image}: Props) => {
  return (
    <div className={styles.wrapperPost}>
      <Button style={{padding: 0}}><Image className={styles.imagePost} src={image} alt={"image post"} width={234} height={228}/></Button>
    </div>

  )
}

export default Post