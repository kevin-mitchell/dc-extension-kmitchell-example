import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import { lazyInject } from '../di/services.container';
import { Component } from 'preact';
import StorageService from '../data/storage.service';

export interface Props {
  value: string,
  optionalValue?: string
}

export interface State {
  useOptional: boolean
}

export default class App extends Component<Props, State> {

    @lazyInject('StorageService') storageService?: StorageService;

    @lazyInject('AmplienceSDKProvider') amplienceSDKProvider?: Promise<any>;
    @lazyInject('AmplienceSDK') amplienceSDK?: Promise<any>;

  constructor() {
    super();
    this.state = {
      useOptional: false
    };
  }

  componentWillMount() {
      if (this.storageService) {
      }
      if (this.amplienceSDK) {
        console.log("yep...");
        try {          
          console.log("amplienceSDK", this.amplienceSDK);
          this.amplienceSDK.then((sdk: any) => {
            console.log("asdfasda");
            console.log("value", sdk.field.getValue());
          }).catch(error => console.log(error));
        } catch(exception) {
          console.log(exception);
        }
                
      }
    console.log("OK");
  }

  render({ value, optionalValue }: Props, { useOptional }: State) {
    return (
      <div id="output"></div>
    );
  }

}