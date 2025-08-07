IMAGE_PREFIX = harbor.data.ventitechnologies.net
IMAGE_NAME = $(IMAGE_PREFIX)/venti/fms/vcs_frontend-frontend
VERSION = $(shell cat VERSION)
FOLDER_NAME = doc
OUTPUT_ZIP = info.zip

dev:
	npm install
	npm run pre-commit
	npm run dev


prod:
	npm install
	npm run pre-commit
	npm run build
	npm run start


.PHONY: shared-packages
shared-packages:
	@rm -rf shared-packages
	@mkdir -p shared-packages
	@for dir in ../../core/frontend/*; do \
	  if [ -d "$$dir/dist" ]; then \
		pkg=$$(basename "$$dir"); \
		mkdir -p "shared-packages/$$pkg"; \
		cp -r "$$dir/dist" "shared-packages/$$pkg/"; \
		cp "$$dir/package.json" "shared-packages/$$pkg/"; \
	  fi; \
	done

docker-build: shared-packages
	docker build \
		-t $(IMAGE_NAME):$(VERSION) \
		.
	@rm -rf shared-packages


docker-push:
	docker push \
		$(IMAGE_NAME):$(VERSION)

docker-run:
	docker run -it --rm \
		--network host \
		-p 3000:3000\
		$(IMAGE_NAME):$(VERSION)

docker-shell:
	docker run -it --rm \
		-p 3000:3000\
		--entrypoint=/bin/sh \
		$(IMAGE_NAME):$(VERSION)
