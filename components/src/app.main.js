// Vue
import Vue from 'vue';

// Helpers
import helpers from './helpers/config';
helpers(Vue);

// Proxies
import proxies from './proxies/config';
proxies(Vue);

window.Vue = Vue;

// Components
import dashboard from './components/dashboard/dashboard.vue';
import venues from './components/venues/venues.vue';

window.Components = [];
window.Components[dashboard.name] = dashboard;
window.Components[venues.name] = venues;