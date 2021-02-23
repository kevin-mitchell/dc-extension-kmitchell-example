import { FunctionalComponent, h } from 'preact';
import { CustomHistory, Route, Router } from 'preact-router';
import { createHashHistory } from 'history';

import KevinExampleOne from '../routes/kevin-example-one/kevin-example-one';
import Home from '../routes/home';
import AmplienceTestHarness from '../routes/amplience-test-harness/amplience-test-harness';
// import Header from './header';

const App: FunctionalComponent = () => {
    return (
        <div id="app">          
            {/* <Header /> */}
            <Router history={createHashHistory() as unknown as CustomHistory}>
                <Route path="/" component={KevinExampleOne} />
                <Route path="/kevin" component={KevinExampleOne} />
                <Route path="/test" component={AmplienceTestHarness} />
                {/* <NotFoundPage default /> */}
            </Router>
        </div>
    );
};

export default App;
