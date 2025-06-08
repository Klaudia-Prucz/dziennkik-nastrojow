import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://srmwdngqjffpbuchgoff.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybXdkbmdxamZmcGJ1Y2hnb2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzOTY5MTMsImV4cCI6MjA2NDk3MjkxM30.CnKF3MFx_eqYoHsSnmYUpaqTKxzqDtDqITCYHrL8sLY' 
export const supabase = createClient(supabaseUrl, supabaseKey)
