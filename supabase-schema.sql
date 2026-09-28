-- PLPS BI Kelas 1 — Supabase Schema
-- Jalankan di: Supabase dashboard → SQL Editor → New query

-- 1. Tabel daftar anak per akun orang tua
create table if not exists public.children (
  id         uuid primary key default gen_random_uuid(),
  parent_id  uuid references auth.users(id) on delete cascade not null,
  nama       text not null,
  kelas      text not null,
  created_at timestamptz default now()
);

alter table public.children enable row level security;

create policy "children_owner" on public.children
  for all
  using  (auth.uid() = parent_id)
  with check (auth.uid() = parent_id);

-- 2. Tabel state asesmen per anak (satu baris per anak)
create table if not exists public.child_states (
  child_id   uuid primary key references public.children(id) on delete cascade,
  state_json jsonb not null default '{}',
  updated_at timestamptz default now()
);

alter table public.child_states enable row level security;

create policy "child_states_owner" on public.child_states
  for all
  using  (exists (
    select 1 from public.children c
    where c.id = child_states.child_id and c.parent_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.children c
    where c.id = child_states.child_id and c.parent_id = auth.uid()
  ));

-- 3. Storage bucket untuk rekaman suara dan foto
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', false, 52428800,
  array['audio/webm','audio/ogg','audio/mp4','audio/wav','image/jpeg','image/png','image/webp']
)
on conflict (id) do nothing;

create policy "media_upload" on storage.objects
  for insert with check (bucket_id = 'media' and auth.uid() is not null);

create policy "media_read" on storage.objects
  for select using (bucket_id = 'media' and auth.uid() is not null);

create policy "media_delete" on storage.objects
  for delete using (bucket_id = 'media' and auth.uid() is not null);
