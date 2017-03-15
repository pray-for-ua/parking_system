import 'babel-polyfill';
import 'url-search-params-polyfill';
// import Perf from 'react-addons-perf';
// window.Perf = Perf;

// const cross = require(`./static/cross.json`);
// window.cross_xhng = cross.cross_xhng;
// window.cross_coef = cross.cross_coef;

import cookie from 'js-cookie';

// window.translates = {wlables:{}, preorder:{}};

import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';
import humps        from 'humps';
// import moment       from 'moment';

window.humps = humps;

import App                   from './src/components/app.js';

import { default as store }  from './src/store/store.js';

window.__myapp_container = document.getElementById(`root`);

const Render = () => {
    const App = require(`./src/components/app.js`).default; // eslint-disable-line global-require
    if (__DEVTOOLS__) {
        const {showDevTools} = require(`./src/devTools.js`); // eslint-disable-line global-require
        ReactDOM.render(
            <Provider store = {store}>
                <App/>
            </Provider>
            , window.__myapp_container
        );
        showDevTools(store);
    }

    if (__PRODUCTION__) {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }

    if (__DEVELOPMENT__) {
        document.getElementsByTagName('html')[0].style.overflow = 'scroll';
    }

    if (!__DEVTOOLS__ || __PRODUCTION__) {
        ReactDOM.render(
            <Provider store = {store}>
                <App/>
            </Provider>
            , window.__myapp_container
        );
    }
};

if (module.hot) {
    // Support hot reloading of components
    // and display an overlay for runtime errors
    const renderApp = Render;
    const renderError = (error) => {
        const RedBox = require(`redbox-react`); // eslint-disable-line global-require
        ReactDOM.render(
            <RedBox error={error} />
            , window.__myapp_container
        );
    };

    const render = () => {
        try {
            renderApp();
        } catch (error) {
            renderError(error);
        }
    };

    module.hot.accept(`./src/components/app.js`, () => {
        setTimeout(render);
    });
}

Render();