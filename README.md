# dc-extension-kmitchell-example

An extremely simple Amplience DC Extension example. 

Goal was to just get something deployed / working in Amplience. A stretch goal was to integrate [InversifyJS](https://github.com/inversify/InversifyJS) to allow components to inject the Amplience SDK / `ContentFieldExtension` into components to avoid sticking the sdk on the global / window object as the Amplience documentation does.

See: `src/components/app.tsx` and `src/di/services.container.ts`.


## Running extensions in iFrame

A "strech goal" was to allow us to run Amplience extensions in iFrames, without a dependency on Amplience for potentially reduced friction during certain development tasks.

This repo has a very simple proof of concept, which can be seen by running

`npm run dev`
and navigating to
`http://0.0.0.0:8080/#/test`

## NOTE ON PATHS AND GITHUB PAGE HOSTING

Note that running `npm run publish` will publish a copy of this repo to `github pages`, which then allows the extension to run within Amplience itself. HOWEVER, there is a limitation with github pages and routing and how Amplience handles hashes in routing.

If you are running this project locally, you want to have a base like `/`. If you want to actually publish the project to github pages, you'll need to update the `start_url` and `config.output.publicPath` as below to make sure paths for static files work in github.

Also note that the router has been setup here to use `#` based routing - this was to hopefully allow me to host multiple extensions in one github pages instance (github responses with a 404 for other paths, and although you can set the 404.html template to serve your webapp it seems Amplience wrapper / parent doesn't like that). This can easily be switched to use non-`#` routing by removing `history={createHashHistory() as unknown as CustomHistory}` in the `app.tsx`.

```
export default (config) => {
    config.output.publicPath = 'repo-name';
  };
```

and

```
{
  "name": "dc-extension-kmitchell-example",
  "short_name": "dc-extension-kmitchell-example",
  "start_url": "/repo-name/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#fff",
  "theme_color": "#673ab8",
  "icons": [
    {
      "src": "/assets/icons/android-chrome-192x192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/assets/icons/android-chrome-512x512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}
```