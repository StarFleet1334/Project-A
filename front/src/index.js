import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'
import { LanguageProvider } from './context/language_context';

// Domain
// dev-q1-k5sau.us.auth0.com

//
// i1JDyhuYxuvJgIyjWWInwsAw5cBdvvpX

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain="dev-q1-k5sau.us.auth0.com"
        clientId="i1JDyhuYxuvJgIyjWWInwsAw5cBdvvpX"
        redirectUri={window.location.origin}
        cacheLocation='localstorage'
    >
        <LanguageProvider>
            <UserProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </FilterProvider>
                </ProductsProvider>
            </UserProvider>
        </LanguageProvider>
    </Auth0Provider>,
)
