# Circle Emitter

[![CircleCI](https://circleci.com/gh/alchemy-works/circle-emitter.svg?style=svg)](https://circleci.com/gh/alchemy-works/circle-emitter)

Easily trigger your workflows!

### Build

```sh
./gradlew clean build
```

### Start

```sh
./scripts/start_emitter.sh
```

### Start with Docker

```sh
./scripts/deploy_emitter.sh
# App will start at localhost:8001
```

### Run pre-compiled jar

```sh
java -jar circle-emitter.jar
# App will start at localhost:8001
```

---

- Java 17 required
- Sample setting JSON: [sample_setting.json](src/main/resources/static/samples/sample_setting.json)
- Download pre-compiled jar: [Releases](https://github.com/alchemy-works/circle-emitter/releases)
