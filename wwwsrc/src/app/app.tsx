import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, Link, browserHistory } from 'react-router'
import appReducer from './reducers';

import PageContainer from "./containers/PageContainer/PageContainer";

export class App extends React.Component<{}, {}> {
    render() {
        // <Router history={browserHistory}>
        //     <Route path="/" component={GreetingContainer} />
        // </Router>
        return (
            <PageContainer />
        );
    }
}

let store = createStore(appReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("example")
);
