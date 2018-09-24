import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorkerCostum from './service-worker-custom';

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
registerServiceWorkerCostum();
