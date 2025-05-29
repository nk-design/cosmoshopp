import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './Context';
import ScrollUp from './ScrollUp';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider>
          <HelmetProvider>
            <ScrollUp />
            <App />
          </HelmetProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
)


// import { hydrateRoot } from 'react-dom/client';


// const container = document.getElementById('root');
// if (container !== null || undefined) {
//   hydrateRoot(container,
//     <React.StrictMode>
//       <BrowserRouter>
//         <Provider>
//           <ScrollUp />
//           <App />
//         </Provider>
//       </BrowserRouter>
//     </React.StrictMode>
//   )
// };