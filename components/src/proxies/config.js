import Axios from 'axios';
import ReportProxy from '../proxies/ReportProxy';

// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json';
Axios.defaults.headers.common.AjaxRequest = 'Accepted';

export default function (Vue) {
    Vue.use({
        install(Vue) {
            Object.defineProperty(Vue.prototype, '$proxies', {
                value: {
                    reportProxy: new ReportProxy(Axios)
                }
            });
        }
    });
};