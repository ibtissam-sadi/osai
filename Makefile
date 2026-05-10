.PHONY: up down logs smoke

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f --tail=100

smoke:
	./scripts/smoke.sh http://localhost:4000
