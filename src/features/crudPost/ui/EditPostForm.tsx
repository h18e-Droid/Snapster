import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {  useAppSelector } from '@/shared/lib/state/useAppSelector'
import { fetchPost, updatePost, postActions } from '../model/postSlice'
// import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import { TextArea } from '@/shared/ui/textArea/TextArea'
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"

interface EditPostFormProps {
  postId: number
  onSuccess?: () => void
  onCancel?: () => void
}

type FormData = {
  description: string
}

export const EditPostForm: React.FC<EditPostFormProps> = ({ 
  postId, 
  onSuccess,
  onCancel 
}) => {
  const dispatch = useAppDispatch()
  const { currentPost, isLoading, error } = useAppSelector((state) => state.post)
  // const router = useRouter()
  
  const { register, handleSubmit, setValue } = useForm<FormData>()

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId))
    }
    
    return () => {
      dispatch(postActions.clearPostState())
    }
  }, [postId, dispatch])

  useEffect(() => {
    if (currentPost) {
      setValue('description', currentPost.description)
    }
  }, [currentPost, setValue])

  const onSubmit = async (data: FormData) => {
    if (!postId) return
    
    try {
      await dispatch(updatePost({ 
        postId, 
        description: data.description 
      })).unwrap()
      
      onSuccess?.()
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  if (isLoading && !currentPost) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <TextArea
          {...register('description', { required: 'Description is required' })}
          placeholder="Edit Post"
          rows={4}
          className="w-full"
        />
      </div>
      
      {error && <div className="text-red-500">{error}</div>}
      
      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
