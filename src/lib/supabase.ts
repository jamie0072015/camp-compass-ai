import { createClient } from '@supabase/supabase-js'

// Using Lovable's native Supabase integration
const supabaseUrl = "https://gypexdgfchklvydgkfvd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cGV4ZGdmY2hrbHZ5ZGdrZnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0MDU3MTYsImV4cCI6MjA0ODk4MTcxNn0.BtBsGTpAjL1xGPFOGQ_cGb-K0v-HFcKl2bA0Lm4MHDA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const uploadMapImage = async (file: File) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `maps/${fileName}`

  const { data, error } = await supabase.storage
    .from('map-images')
    .upload(filePath, file)

  if (error) {
    throw error
  }

  const { data: { publicUrl } } = supabase.storage
    .from('map-images')
    .getPublicUrl(filePath)

  return { path: data.path, url: publicUrl }
}