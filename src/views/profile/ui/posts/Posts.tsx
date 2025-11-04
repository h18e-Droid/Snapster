"use client"

import styles from "./Posts.module.scss"
import Post from "@/shared/ui/post/Post"
import { useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store"
import { initialStateType } from "@/entities/user/lib/types/types"
import { BlockIcon } from "@/shared/assets/icons"
import { ResponsesGetAllPosts } from "@/features/crudPost/api/postApi"
import { fetchMorePosts } from "@/entities/user/model/slice"

type Props = {
  dataPosts: ResponsesGetAllPosts | undefined
}

const Posts = ({dataPosts}: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { visiblePosts, hasMore, isLoading } = useSelector<RootState, initialStateType>((state) => state.user)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchMorePosts())
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore, dispatch],
  )

  useEffect(() => {
    /*if (visiblePosts.length === 0) {
      dispatch(fetchMorePosts())
    }*/
  }, [dispatch, visiblePosts.length])

  return (
    <div className={styles.wrapperPosts}>
      {dataPosts?.items?.map((post, index) => {
        const isLast = index === visiblePosts.length - 1
        return (
          <div key={post.id} ref={isLast ? lastPostRef : null}>
            <Post image={post.pictures[0].url} />
          </div>
        )
      })}
      {isLoading && <p className={styles.loader}>Loading...</p>}
      {!isLoading && !hasMore && (
        <div className={styles.emptyPosts}>
          <BlockIcon size={45} />
          <h2>No Posts Yet</h2>
        </div>
      )}
    </div>
  )
}
export default Posts
