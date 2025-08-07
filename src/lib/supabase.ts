import { createClient } from '@supabase/supabase-js'

// Using Lovable's native Supabase integration
const supabaseUrl = "https://gypexdgfchklvydgkfvd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cGV4ZGdmY2hrbHZ5ZGdrZnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0MDU3MTYsImV4cCI6MjA0ODk4MTcxNn0.BtBsGTpAjL1xGPFOGQ_cGb-K0v-HFcKl2bA0Lm4MHDA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create storage bucket if it doesn't exist
export const createStorageBucket = async () => {
  const { data: buckets } = await supabase.storage.listBuckets()
  const bucketExists = buckets?.some(bucket => bucket.name === 'map-images')
  
  if (!bucketExists) {
    const { error } = await supabase.storage.createBucket('map-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
      fileSizeLimit: 10485760 // 10MB
    })
    if (error && !error.message.includes('already exists')) {
      console.error('Error creating bucket:', error)
    }
  }
}

export const uploadMapImage = async (file: File) => {
  try {
    // Ensure bucket exists
    await createStorageBucket()
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `maps/${fileName}`

    const { data, error } = await supabase.storage
      .from('map-images')
      .upload(filePath, file, {
        upsert: false,
        cacheControl: '3600'
      })

    if (error) {
      console.error('Storage upload error:', error)
      throw new Error(`Upload failed: ${error.message}`)
    }

    const { data: { publicUrl } } = supabase.storage
      .from('map-images')
      .getPublicUrl(filePath)

    return { path: data.path, url: publicUrl }
  } catch (error) {
    console.error('Upload process error:', error)
    throw error
  }
}