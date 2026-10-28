Sometimes I happened to have conflicts in the merge phase every time I modified those files that contained different properties for each environment.
For a long time I continued with this approach, resolving conflicts by hand thinking it was the right thing.

But looking online a bit I realized that there were many solutions, only that I didn't use any of them 😁.

In this article we will see how to configure and use different configuration files for environment variables.

---

Let's imagine we have 3 environments, one for **development**, one for **system test** and one for **production**.

![3 envs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nxk7k57isnwa2vtewrq1.png)

A classic division on the code side would be to create a repository with 3 branches inside, one for each environment.

Now suppose we need to interact with backend services with different endpoints in each environment (different endpoints).
To do this, our 3 branches will probably never be completely aligned, right?

![envs with endpoind](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lollabg12vv1m19azmpg.png)

By implementing a multiple file system for managing environment variables we could create 3 files on each branch:

1. .env.dev
2. .env.sit
3. .env.prod

These files will all have a variable that we will call **REACT_APP_BACKEND_URL** (we use the REACT_APP prefix only because it is required by the library itself) and which will contain the value of the right endpoint to use.

```
REACT_APP_BACKEND_URL=dev-sample
```

In this way the application on each branch will have the exact same source.

The only thing we are missing is to start / build the app with one configuration file rather than another and change the endpoints within the app dynamically like this for example:

```js
const backend_url = `https://${process.env.REACT_APP_BACKEND_URL}`
```

To solve the problem I will use the [env-cmd](https://www.npmjs.com/package/env-cmd) library, thanks to it we can define via a script inside the package.json file which configuration file to read.

First, the library must be installed by launching:

`npm install env-cmd`

Let's add these 3 commands to the scripts tag, inside the **package.json** file.

```json
{
  "scripts": {
     "start:dev": "env-cmd -f .env.dev react-scripts start",
     "start:sit": "env-cmd -f .env.sit react-scripts start",
     "start:prod": "env-cmd -f .env.prod react-scripts start"
  }
}
```

Thanks to the keyword **-f** we indicate the file from which to read the variables and then proceed with the normal start of the application.

This approach is very useful for several reasons:

- We can test the new features with production services directly locally without having to change anything, just launch the command:

`npm run start:prod`

- If you have pipelines for automatic build and deployment, you can create 3 other similar commands and decide to build with the right endpoints based on the pipeline launched.

```json
{
  "scripts": {
     "start:dev": "env-cmd -f .env.dev react-scripts start",
     "start:sit": "env-cmd -f .env.sit react-scripts start",
     "start:prod": "env-cmd -f .env.prod react-scripts start",
     "build:dev": "env-cmd -f .env.dev npm run build",
     "build:sit": "env-cmd -f .env.sit npm run build",
     "build:prod": "env-cmd -f .env.prod npm run build",
     "build": "react-scripts build"
  }
}
```

- You can implement hidden features for certain environments and simulate what is done via feature flags, directly on the client side.
Giving only the application running in development and system test the opportunity to test a new feature, while also bringing the source into production.

---

If you liked the post or if you are interested in learning more about the topic, tell me below, so that I can make a video or similar articles based on the different use cases 😉.
