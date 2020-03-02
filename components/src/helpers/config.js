import BrecaLocalCache from '../helpers/BrecaLocalCache';

export default function (Vue) {
    Vue.use({
        install(Vue) {
            Object.defineProperty(Vue.prototype, '$helpers', {
                value: {
                    cache: new BrecaLocalCache('breca-challenge')
                }
            });
        }
    });
};