## **Running the App:**

**Requirements:**

- Docker CLI

**Step 1 - Build the docker image:**

Run the following command on the root of the project to build the docker image

```console
$ docker build . -t risk-score-web
```

**Step 2 - Start the docker container:**

```console
$ docker run -p 3031:3000 -d risk-score-api
```
