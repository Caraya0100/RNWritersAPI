.PHONY: build init update bash addprj deploy serve fshell flog clean beautify installpkg

build:
	docker build -t demo-store-api docker --no-cache

init:
	sh firebase-init.sh

update:
	docker-compose run -w /opt/api/functions api \
		npm install firebase-functions@latest firebase-admin@latest --save
	docker-compose run -w /opt/api/functions api \
		npm install -g firebase-tools

fb:
	docker-compose run api firebase $(ARGS)

addprj:
	docker-compose run api firebase use --add

deploy:
	docker-compose run api firebase deploy --only functions

serve:
	docker-compose up

test:
	docker-compose run -w /opt/api/functions api \
		npm test

fshell:
	docker-compose run -w /opt/api/functions api \
		sh -c "firebase functions:config:get > .runtimeconfig.json && \
		       firebase functions:shell"

flog:
	docker-compose run -w /opt/api/functions api \
		firebase functions:log

bash:
	docker-compose run api bash

clean:
	docker-compose rm

beautify:
	docker-compose run -w /opt/api/functions api \
		 js-beautify -r $(FILES)

installpkg:
	 docker-compose run -w /opt/api/functions api \
		 npm install $(ARGS) $(PKGS)
