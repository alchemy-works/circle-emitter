# CircleCI Emitter

[![CircleCI](https://circleci.com/gh/alchemy-works/circleci-emitter.svg?style=svg)](https://circleci.com/gh/alchemy-works/circleci-emitter)

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
java -jar circleci-emitter.jar
# App will start at localhost:8001
```

---

- Java 17 required
- Sample setting JSON: [sample_setting.json](sample_setting.json)
- Download pre-compiled jar: [Releases](https://github.com/alchemy-works/circleci-emitter/releases)
