import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const supabase = createClient(
  'https://dnnryxwbloixwhzidzjg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRubnJ5eHdibG9peHdoemlkempnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NzY0MzAsImV4cCI6MjEwNTQ1MjQzMH0.Fgf7uUnmJJrihiy_7_9AYXKprmqVQz2qeDLjKaNbXaY'
);
