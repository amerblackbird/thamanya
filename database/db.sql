create EXTENSION IF NOT EXISTS "uuid-ossp";
create index IF NOT EXISTS episodes_search_idx ON tbl_episodes USING GIN (search_vector);
create index IF NOT EXISTS programs_search_idx ON tbl_programs USING GIN (search_vector);