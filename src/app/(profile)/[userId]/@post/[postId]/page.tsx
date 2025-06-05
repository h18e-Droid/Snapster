import React from "react"
import PostModal from "@/widgets/post/ui/PostModal"

const Page = ({ params }: { params: Promise<{ postId: string; userId: string }> }) => {
  const { userId } = React.use(params)
  return <PostModal userId={userId} />
}

export default Page
