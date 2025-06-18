CREATE INDEX episodes_search_idx ON tbl_episodes USING GIN (search_vector);
CREATE INDEX programs_search_idx ON tbl_programs USING GIN (search_vector);
