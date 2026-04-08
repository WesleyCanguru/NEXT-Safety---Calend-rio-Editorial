CREATE TABLE IF NOT EXISTS client_folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES client_folders(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE documents ADD COLUMN IF NOT EXISTS folder_id UUID REFERENCES client_folders(id) ON DELETE CASCADE;
