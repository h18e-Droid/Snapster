import { Follower } from "@/views/myProfile/headerInfoUserModal/HeaderInfoUserModal"
import { StaticImageData } from "next/image"

export type user = {
  id: string
  /*username: string*/
}

export type PostType = {
  id: string
  description: string
  userName: string
  createdAt: string
  pictures: [
    {
      url: StaticImageData
    }
  ]
}

export type initialStateType = {
  user: null | user
  followersList: Follower[]
  posts: PostType[]
  visiblePosts: PostType[],
  hasMore: boolean,
  isLoading: boolean,
}
