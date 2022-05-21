build:
	@docker build -t quay.io/ardanlabs/ardan-labs-racing-game .

run: build
	@docker run -p 8080:80 quay.io/ardanlabs/ardan-labs-racing-game

push: build
	@docker push quay.io/ardanlabs/ardan-labs-racing-game

deploy: push
	@curl -X POST -d "" https://hooks.cloud66.com/stacks/redeploy/103c4c9d8e625f05551c9d64256a30b6/2c366231dcab8d579e51077d21157ac0?services=ardan-labs-api,ardan-labs-hugo

open:
	@open http://localhost:8080
