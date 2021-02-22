# dc-extension-kmitchell-example

An extremely simple Amplience DC Extension example. 

Goal was to just get something deployed / working in Amplience. A stretch goal was to integrate [InversifyJS](https://github.com/inversify/InversifyJS) to allow components to inject the Amplience SDK / `ContentFieldExtension` into components to avoid sticking the sdk on the global / window object as the Amplience documentation does.

See: `src/components/app.tsx` and `src/di/services.container.ts`.