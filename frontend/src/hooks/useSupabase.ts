import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

type SupabaseProps = {
  path: string
  file?: File
  from?: string
  upsert?: boolean
}

type UploadImageProps = Omit<SupabaseProps, 'file'> & { file: File }
type GetImageProps = SupabaseProps
type RemoveImageProps = Omit<SupabaseProps, 'path'> & { path: string[] }

export const useSupabase = () => {
  const CDN_BASEURL = `
    https://gxofgbywooawayvtndml.supabase.co/storage/v1/object/public/
  `

  const uploadImage = async ({
    file,
    path,
    from = 'images',
    upsert = true
  }: Omit<UploadImageProps, 'file'> & { file: File }) => {
    const result = await supabase.storage.from(from).upload(path, file, {
      upsert,
      cacheControl: '900' // 15 minutes
    })

    if (result.error) {
      toast.error(result.error.message)
    }
    return result
  }

  const getImage = ({ path, from = 'images' }: GetImageProps) => {
    return supabase.storage.from(from).getPublicUrl(path).data.publicUrl
  }

  const removeImages = async ({ path, from = 'images' }: RemoveImageProps) => {
    const result = await supabase.storage.from(from).remove(path)

    if (result.error) {
      toast.error(result.error.message)
    }
    return result
  }

  return { CDN_BASEURL, uploadImage, getImage, removeImages }
}
