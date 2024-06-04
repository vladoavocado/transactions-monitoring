.PHONY: ssl-certificate

ssl-certificate:
	mkdir -p certs
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./certs/localhost.key -out ./certs/localhost.crt -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

bump-patch:
	git pull
	yarn run version:bump patch
	git push
	git push --tags

bump-patch-force:
	git pull
	yarn run version:bump patch force
	git push
	git push --tags

bump-minor:
	git pull
	yarn run version:bump minor
	git push
	git push --tags

bump-minor-force:
	git pull
	yarn run version:bump minor force
	git push
	git push --tags

bump-major:
	git pull
	yarn run version:bump major
	git push
	git push --tags

bump-major-force:
	git pull
	yarn run version:bump major force
	git push
	git push --tags