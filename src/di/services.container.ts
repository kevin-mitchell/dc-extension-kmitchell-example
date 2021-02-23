import { Container, interfaces } from 'inversify';
import getDecorators from 'inversify-inject-decorators'; 
import StorageService from '../data/storage.service';
import WindowStub from '../test/amplience/window-stub';


import { init } from 'dc-extensions-sdk';
import type { ContentFieldExtension } from 'dc-extensions-sdk';
import { from, of, pipe, ReplaySubject, BehaviorSubject } from 'rxjs';

// define the input field model
interface FieldModel {
    title: string;
    type: string;
    control: string;
    format: string;
    minLength: number;
    maxLength: number;
  }
  
  // define the installation config parameters
  interface Parameters {
    instance: {};
    installation: {
      configParam: string;
    };
  }


export const container = new Container({ autoBindInjectable: true });

container.bind('StorageService').to(StorageService).inSingletonScope();

container.bind('AmplienceSDK$').toDynamicValue((context: interfaces.Context) => {    
    let replaySubject = new ReplaySubject<ContentFieldExtension<FieldModel, Parameters>>(1);
    from(init<ContentFieldExtension<FieldModel, Parameters>>({
        // window: new WindowStub() as unknown as Window,
        debug: true
    })).subscribe(replaySubject);  
    return replaySubject;
}).inSingletonScope();

// container.bind('AmplienceSDKProvider').toProvider<ContentFieldExtension<FieldModel, Parameters>>((context: interfaces.Context) => {
//     console.log("Amplience SDK Provider factory was called");
//     return () => {
//         return init<ContentFieldExtension<FieldModel, Parameters>>();  
//     }    
// });



// Additional function to make property decorators compatible with babel.
let { lazyInject: originalLazyInject } = getDecorators(container); 
function fixPropertyDecorator<T extends Function>(decorator: T): T {
    return ((...args: any[]) => (
        target: any,
        propertyName: any,
        ...decoratorArgs: any[]
    ) => {
        decorator(...args)(target, propertyName, ...decoratorArgs);
        return Object.getOwnPropertyDescriptor(target, propertyName);
    }) as any;
}

export const lazyInject = fixPropertyDecorator(originalLazyInject);