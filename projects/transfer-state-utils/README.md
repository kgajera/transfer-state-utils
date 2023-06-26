# TransferState Utils

[![npm version](https://badge.fury.io/js/transfer-state-utils.svg)](https://www.npmjs.com/package/transfer-state-utils)

A small utility to set (on server) and get (on browser) [TransferState](https://angular.io/api/core/TransferState) values.

## Getting started

Install the package with:

```shell
npm install transfer-state-utils
```

## Usage

### getOrSet()

```ts
getOrSet<T>(key: string, value: T): T | null
```

#### Parameters

- `key` - Name of the key
- `value` - Data from server-side to store

#### Example

Let's say you have the following Express route to server-side render your app. It injects a token containing a value passed from Express server:

```ts
// SSR using an Express server from Angular Universal
server.get("*", async (req, res) => {
  res.render(indexHtml, {
    req,
    providers: [
      { provide: APP_BASE_HREF, useValue: req.baseUrl },
      // Inject a value from the server
      // Here we are passing a string, but this could be data from your database or other sources
      { provide: "message", useValue: "Test message from server" },
    ],
  });
});
```

You can use the `getOrSet` function in your app to set the value in the TransferState store when run on the server, and get the value when run on the browser:

```ts
@Component({
  selector: "app-root",
  template: `{{ message }}`,
})
export class AppComponent {
  message: string;

  constructor(
    // Injection token from Express server
    @Optional() @Inject("message") private messageFromServer: string
  ) {
    // When rendered on the server, set the value in the TransferState store
    // When rendered on the client, get the value from the TransferState store
    this.message = getOrSet("message", messageFromServer);
  }
}
```
