CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE INDEX IF NOT EXISTS episodes_search_idx ON tbl_episodes USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS programs_search_idx ON tbl_programs USING GIN (search_vector);