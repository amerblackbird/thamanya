run:
	pnpm run start

db-generate:
	pnpm run typeorm migration:generate ./database/migrations/migration

db-migrate:
	pnpm run typeorm migration:run