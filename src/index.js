import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
//3shan hastkhdemo fy aktar men haga
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { QueryClient , QueryClientProvider} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import UserContextProvider from './Context/UserContext';


let queryClient =  new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//keda a2dar astkhdem el react query fy ay component 3andy
  <QueryClientProvider  client={queryClient}>
<UserContextProvider>
<React.StrictMode>
    <App />
  </React.StrictMode>
  </UserContextProvider>
<ReactQueryDevtools initialIsOpen="false" position='bottom-right'/>
  </QueryClientProvider>
  
);



