CREATE TABLE IF NOT EXISTS client_briefings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  agency_id INTEGER DEFAULT 1,
  service_type TEXT NOT NULL,
  answers JSONB DEFAULT '{}'::jsonb,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, service_type)
);

ALTER TABLE client_briefings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for client_briefings"
  ON client_briefings FOR ALL
  USING (true)
  WITH CHECK (true);
