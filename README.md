# Dev Quest

## Prerequisites:

| Stuff         | Minimum version |
| ------------- | --------------- |
| `Angular CLI` | `v19.0.1`       |
| `Node.js`     | `v22.12.0`      |

## Project Overview

This is a base project to be used as a starting point for implementing Angular frontends. It provides a modular structure, incorporating authentication, product management, and theme handling, and is designed to facilitate a scalable and maintainable codebase. The project includes a layout structure, shared components, guards, interceptors, and more, allowing easy extension by adding new features or modules.

The application state is managed with [NgRx](https://ngrx.io/), a reactive state management library for Angular, which facilitates handling of global state, effects, actions, and reducers across the application. Additionally, the project is configured to sync application state with local storage, ensuring persistence across sessions.

## Version Control and Branching Strategy

We follow a structured branching strategy to maintain code quality and streamline development. For full details on our branching rules and processes, please refer to the [Git Branching Strategy](https://syscons-futura.atlassian.net/wiki/spaces/WL/pages/94339075/Repository+management+and+Git+Branching+Model+adoption) page on Confluence.

## Naming Conventions

To ensure consistency and clarity in the codebase, we follow the official [Angular Style Guide](https://angular.dev/style-guide) with the following additional rules for NgRx and the application structure. Additional details can be found on the [Frontend - Naming Conventions & Code Style](https://syscons-futura.atlassian.net/wiki/spaces/WL/pages/80838688/Frontend+-+Naming+Conventions+Code+Style) page on Confluence.

### Examples: Components, Services, and Models

- **Components**: `component-name.component.ts` (e.g., `user-profile.component.ts`)

- **Services**: `service-name.service.ts` (e.g., `user-authentication.service.ts`)

- **Models**: `model-name.model.ts` (e.g., `user-details.model.ts`)

### NgRx Store Naming Conventions

For managing the application state with NgRx, we follow the below naming conventions:

- **Actions**: `feature-name.actions.ts` (e.g., `auth.actions.ts`)

- **Reducers**: `feature-name.reducer.ts` (e.g., `auth.reducer.ts`)

- **Effects**: `feature-name.effects.ts` (e.g., `auth.effects.ts`)

- **Selectors**: `feature-name.selectors.ts` (e.g., `auth.selectors.ts`)

- **State**: `feature-name.state.ts` (e.g., `auth.state.ts`)

Each file name should reflect the feature it is associated with. For example, in an authentication module, the state management files follow the convention: `auth.actions.ts`, `auth.reducer.ts`, etc.

## Folder Structure and Organization

Here’s a simplified breakdown of the folder structure:

- **components**: Shared and reusable UI elements.
- **guards**: Route guards to control access to application routes.
- **interceptors**: HTTP interceptors for modifying requests or handling responses.
- **models**: Application-wide data models.
- **services**: Shared services used across different modules.
- **modules**: Each feature or domain should have its own module, which includes its components, services, and NgRx state management (actions, reducers, effects, selectors, state).

Static assets and environment configurations are stored in the `assets` and `environments` folders, respectively.

## Adding New Modules

When adding a new module, the structure should follow Angular's modular development guidelines, ensuring each module is self-contained. Inside the `modules` folder, create a new folder for the module, and inside that, include:

- **Components**: UI components specific to the module.
- **Services**: Services related to the module.
- **NgRx State**: State management files like actions, reducers, effects, selectors, and state.

For example, if you're adding a new feature called "orders," you would create a new `orders` folder inside `modules`, with its own components, services, and store (actions, reducers, etc.). This keeps the module isolated and easy to manage.

### Dedicated Module Structure Example

- `modules/orders`
  - `orders.component.ts`
  - `orders.service.ts`
  - `orders.actions.ts`
  - `orders.reducer.ts`
  - `orders.effects.ts`
  - `orders.selectors.ts`
  - `orders.state.ts`

This way, the module is self-contained and can be easily extended or modified without affecting other parts of the application.

### Shared Code

Any code that is shared across multiple modules, such as services, components, or utilities, should **not** be placed inside the `modules` folder. Instead, place them in appropriate shared folders like `components/shared`, `services`, or `models`, depending on the type of code. This ensures clear separation between feature-specific code and shared code, promoting reusability and maintainability.

For example, a global authentication service would go under `services`, while a shared user profile component would go under `components/shared`.

## Application State Management with NgRx

The application state is managed using [NgRx](https://ngrx.io/), which allows you to:

- Use **actions** to describe state changes.
- Handle **effects** to manage side effects such as HTTP calls.
- Use **reducers** to update the state based on the actions.
- Select portions of the state via **selectors**.

### Local Storage Sync

NgRx is configured to sync specific parts of the application state with the browser's local storage. This synchronization is enabled through a meta-reducer defined in the configuration. To enable state synchronization, you specify the part of the state to be synchronized in the `localStorageSyncReducer` function within `app.config.ts`.

Here’s an example of how the `authState` store is synchronized with local storage:

```typescript
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['authState'], rehydrate: true })(reducer);
}
```

In this example, the `authState` store is synchronized with local storage, and the state is rehydrated on app reload.

To sync additional stores with local storage, simply add the relevant store key to the `keys` array.

---

## Instructions to Run the Project Locally

1. Clone the repository to your local machine.
2. Run `npm install` to install all necessary dependencies.
3. Once installation is complete, run `ng serve` to start the local development server.
4. Navigate to `http://localhost:4200/` in your browser to view the application.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Local, QA and Production Builds

- Run `ng build` to build the project with the default configuration (development). The build artifacts will be stored in the `dist/dev-quest-dev` directory.
- Run `ng build --configuration=qa` to build the project for QA environment. The build artifacts will be stored in the `dist/dev-quest-qa` directory.
- Run `ng build --configuration=production` to build the project for Production environment. The build artifacts will be stored in the `dist/anki-app-production` directory.
- Run `ng build --configuration=cf` to build the project for Cloud Foundry environment. The build artifacts will be stored in the `dist/dev-quest-cf` directory.

### Managing Dependencies

- Run `npm outdated` to check outdated dependencies.
- Run `npx npm-check-updates` to check for updates.
- Run `npx npm-check-updates -u` to update all dependencies.
- Run `npm install` after updating dependencies to install the latest versions.
- Run `npm install --legacy-peer-deps` if `npm install` fails due to dependency issues. This allows the installation to proceed by ignoring strict peer dependency resolutions.

## Deployment in Docker

Before deploying in Docker, make sure you have Docker installed on your machine.
To build and run the application in a Docker container, use the following commands:

Build the Docker image:

```bash
docker build -t dev-quest .
```

Run the Docker container:

```bash
docker run -d -p 4200:4200 dev-quest
```

---

### Deployment in Cloud Foundry environment

Make sure you got a _manifest.yml_ inside your root project.

```yaml
---
applications:
  - name: dev-quest
    memory: 512M
    disk_quota: 1024M
    instances: 1
    path: ./dist/dev-quest-cf
    buildpacks:
      - nodejs_buildpack
    command: node server/server.mjs
```

Inside a bash console, login to your Cloud Foundry environment, select the space you prefer and then push into it:

```bash
cf login -a https://api.cf.eu20-001.hana.ondemand.com --sso
cf push
```

---

## Building and Pushing Image to Google Artifact Registry

Follow these steps to build and push the **Dev Quest Fronted** Docker image to **Google Artifact Registry**.

### Download the Service Account Key

1. Go to the [Google Cloud Console Service Accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts).
2. Select the **Service Account** named `wl-artifact-registry-sa`.
3. Navigate to the **Keys** tab.
4. Click **Add Key > Create New Key**.
5. Select **JSON** and download the key file to your local machine.

### Configure Docker Authentication

Once you have the Service Account key file, follow these steps to authenticate Docker with Google Artifact Registry:

1. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of the Service Account key file:

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
   ```

2. Authenticate using the Service Account key:

   ```bash
   gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
   ```

3. Configure Docker to authenticate with Google Artifact Registry:

   ```bash
   gcloud auth configure-docker europe-west12-docker.pkg.dev
   ```

   Replace `europe-west12-docker.pkg.dev` with the domain for your repository's region if necessary.

### Build the Base Image

Navigate to the directory containing your Dockerfile. Use the following command to build the Docker image:

```bash
docker build --platform=linux/amd64 -t europe-west12-docker.pkg.dev/<project-id>/<repository-name>/<image-name>:<tag> -f <Dockerfile> .
```

Replace the placeholders:

- `<project-id>`: Your Google Cloud Project ID (e.g., syscons-lab-gcp).
- `<repository-name>`: The name of your Artifact Registry repository (e.g., dev-quest).
- `<image-name>`: The name you want to give to the image (e.g., base-openjdk-gcloud).
- `<tag>`: The version or tag of the image (e.g., latest or v1.0).
- `<Dockerfile>`: The relative path to your Dockerfile (e.g., base-docker-image/base-openjdk-gcloud.Dockerfile).

**Example:**

```bash
docker build --platform=linux/amd64 -t europe-west12-docker.pkg.dev/syscons-lab-gcp/dev-quest/app-dev-quest-fe:latest -f docker/prod/Dockerfile .
```

### Push the Docker Image to Google Artifact Registry

Once the image has been built, push it to Artifact Registry using the following command:

**Example:**

```bash
docker push europe-west12-docker.pkg.dev/syscons-lab-gcp/dev-quest/app-dev-quest-fe:latest
```

---

### Let's Build Something Awesome Together!

Remember "With great power comes great responsibility." 💻🚀 Don't be afraid to push boundaries (or code)! Every commit brings us one step closer to greatness. So grab your keyboard, write some epic code, and let's make this project legendary! 👾✨

Contribute, improve, and let's ship it like pros! 🤘
