import Vue from 'vue'
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";
import App from './App.vue'

process.env.NODE_ENV === "production" && Sentry.init({
  dsn: "http://bed3296618ce480d9e0eb8f4da483527@localhost:9000/2",
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true,
    }),
    new Integrations.BrowserTracing(),
  ],
  release: 'pro@1.0.1',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
