# CircleCI Emitter

[![CircleCI](https://circleci.com/gh/cbdyzj/circleci-emitter.svg?style=svg)](https://circleci.com/gh/cbdyzj/circleci-emitter)

### Build

```sh
./gradlew clean build
```

### Start

```sh
./scripts/start_emitter.sh
```

### Run pre-compiled jar

```sh
java -jar circleci-emitter.jar
# App will start at localhost:8080
```

---

- Java 17 required
- Sample setting JSON: [sample_setting.json](sample_setting.json)
- Download pre-compiled jar: [Releases](https://github.com/cbdyzj/circleci-emitter/releases)
