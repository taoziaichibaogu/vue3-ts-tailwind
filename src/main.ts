import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import autoRegisterComponents from './plugins/autoImportComponents';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles/main.css';

async function bootstrap() {
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);
  app.use(ElementPlus);

  autoRegisterComponents(app);

  app.mount('#app');
}

bootstrap();
