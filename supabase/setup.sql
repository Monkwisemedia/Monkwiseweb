-- Run this in your Supabase project's SQL Editor (left sidebar > SQL Editor > New query)
-- This creates the table that stores every contact form submission from your website.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null
);

-- Row Level Security: locks the table down so it can only be written to
-- via the server (using the service role key), not directly from a browser.
alter table leads enable row level security;

-- No public policies are created on purpose — the website's API route
-- uses the service role key, which bypasses RLS safely on the server side.
