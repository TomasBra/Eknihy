import React, { useState, useEffect } from 'react';
import { Route, useLocation } from 'react-router';
import { Layout } from './components/Shared/Layout';
import { Homepage } from './Pages/HomePage/Homepage';
import './custom.css'
import { useLocalStorage } from './components/Hooks/useLocalStorage';
import { Storepage } from './Pages/StorePage/Storepage';
import { Cartpage } from './Pages/CartPage/Cartpage';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { RegisterPage } from './Pages/RegisterPage/RegisterPage';
import { CheckoutPage } from './Pages/CheckoutOrder/CheckoutPage';
import { BooksPage } from './Pages/BooksPage/BooksPage';
import { SettingsPage } from './Pages/SettingsPage/SettingsPage';
import { ProductPage } from './Pages/ProductPage/ProductPage';
import { ReaderPage } from './Pages/ReaderPage/ReaderPage';
import { AdministrationPageNewProduct } from './Pages/Administration/ProductsPages/AdministrationPageNewProduct/AdministrationPageNewProduct';
import { AdministrationPageNewAuthor } from './Pages/Administration/AuthorsPages/AdministrationPageNewAuthor/AdministrationPageNewAuthor';
import { AdministrationPageNewCategory } from './Pages/Administration/CategoriesPages/AdministrationPageNewCategory/AdministrationPageNewCategory';
import { AdministrationPageNewPublishingHouse } from './Pages/Administration/PublishingHousesPages/AdministrationPageNewPublishingHouse/AdministrationPageNewPublishingHouse';
import { AdministrationHomePage } from './Pages/Administration/AdministrationHomePage/AdministrationHomePage';
import { AdministrationPageCategories } from './Pages/Administration/CategoriesPages/AdministrationPageCategories/AdministrationPageCategories';
import { AdministrationPagePublishingHouses } from './Pages/Administration/PublishingHousesPages/AdministrationPagePublishingHouses/AdministrationPagePublishingHouses';
import { AdministrationPageAuthors } from './Pages/Administration/AuthorsPages/AdministrationPageAuthors/AdministrationPageAuthors';
import { AdministrationPageEditPublishingHouse } from './Pages/Administration/PublishingHousesPages/AdministrationPageEditPublishingHouse/AdministrationPageEditPublishingHouse';
import { AdministrationPageEditCategory } from './Pages/Administration/CategoriesPages/AdministrationPageEditCategory/AdministrationPageEditCategory';
import { AdministrationPageEditAuthor } from './Pages/Administration/AuthorsPages/AdministrationPageEditAuthor/AdministrationPageEditAuthor';
import { AdministrationPageProducts } from './Pages/Administration/ProductsPages/AdministrationPageProducts/AdministrationPageProducts';
import { AdministrationPageEditProduct } from './Pages/Administration/ProductsPages/AdministrationPageEditProduct/AdministrationPageEditProduct';
import { RegistrationConfirmPage } from './Pages/RegistrationConfirmPage/RegistrationConfirmPage';
import { ContactPage } from './Pages/ContactPage/ContactPage';
import { ResendPasswordPage } from './Pages/ResendPasswordPage/ResendPasswordPage';
import { AdministrationPageUsers } from './Pages/Administration/UsersPages/AdministrationPageUsers/AdministrationPageUsers';
import { AdministrationPageNewUser } from './Pages/Administration/UsersPages/AdministrationPageNewUser/AdministrationPageNewUser';
import { AdministrationPageEditUser } from './Pages/Administration/UsersPages/AdministrationPageEditUser/AdministrationPageEditUser';
import { AdministrationPageOrders } from './Pages/Administration/OrdersPages/AdministrationPageOrders/AdministrationPageOrders';
import { OrdersPage } from './Pages/OrdersPage/OrdersPage';
import { SelectDevicePage } from './Pages/ApplicationPages/SelectDevicePage/SelectDevicePage';
import { PcApplicationPage } from './Pages/ApplicationPages/PcApplicationPage/PcApplicationPage';
import { iOSApplicationPage } from './Pages/ApplicationPages/iOSApplicationPage/iOSApplicationPage';
import { AndroidApplicationPage } from './Pages/ApplicationPages/AndroidApplicationPage/AndroidApplicationPage';



export const GlobalContext = React.createContext();

export default function App() {

    //static displayName = App.name;
    const [SearchValue, SetSearchValue] = useState(null);
    const [SearchVisible, SetSearchVisible] = useState(false);
    const [CartVisible, SetCartVisible] = useState(false);
    const [AddedToCart, SetAddedToCart] = useState({ message: "", boolean: false });
    const [User, SetUser] = useLocalStorage("User");
    const [ItemsInCart, SetItemsInCart] = useLocalStorage("CartItems", []);

    let location = useLocation();

    useEffect(() => {
        console.log(location.pathname.includes("store"));
        if (!location.pathname.includes("store") && !location.pathname.includes("books") && !location.pathname.includes("administration/get/products")) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    }, [location]);

    return (
        <GlobalContext.Provider value={{ SearchVisible, SetSearchVisible, SearchValue, SetSearchValue, CartVisible, SetCartVisible, AddedToCart, SetAddedToCart, ItemsInCart, SetItemsInCart,User, SetUser }}>
            <Layout>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/contact' component={ContactPage} />
                <Route path='/store/:category/:content/:search' component={Storepage} />
                <Route exact path='/store/:category/:content' component={Storepage} />
                <Route path='/books/:category/:content/:search' component={BooksPage} />
                <Route exact path='/books/:category/:content' component={BooksPage} />
                <Route exact path='/administration' component={AdministrationHomePage} />
                <Route exact path='/administration/products/new' component={AdministrationPageNewProduct} />
                <Route exact path='/administration/authors/new' component={AdministrationPageNewAuthor} />
                <Route exact path='/administration/authors/edit/:id' component={AdministrationPageEditAuthor} />
                <Route exact path='/administration/categories/new' component={AdministrationPageNewCategory} />
                <Route exact path='/administration/authors' component={AdministrationPageAuthors} />
                <Route exact path='/administration/categories' component={AdministrationPageCategories} />
                <Route exact path='/administration/categories/edit/:id' component={AdministrationPageEditCategory} />
                <Route exact path='/administration/publishinghouses/new' component={AdministrationPageNewPublishingHouse} />
                <Route exact path='/administration/publishinghouses' component={AdministrationPagePublishingHouses} />
                <Route exact path='/administration/publishinghouses/edit/:id' component={AdministrationPageEditPublishingHouse} />
                <Route exact path='/administration/message/:message' component={AdministrationHomePage} />
                <Route exact path='/administration/products/edit/:id' component={AdministrationPageEditProduct} />

                <Route exact path='/administration/get/products/:category/:content/:search' component={AdministrationPageProducts} />
                <Route exact path='/administration/get/products/:category/:content' component={AdministrationPageProducts} />

                <Route exact path='/administration/get/users/:content/:search' component={AdministrationPageUsers} />
                <Route exact path='/administration/get/users/:content' component={AdministrationPageUsers} />
                <Route exact path='/administration/users/new' component={AdministrationPageNewUser} />

                <Route exact path='/administration/users/edit/:id' component={AdministrationPageEditUser} />

                <Route exact path='/administration/get/orders/:content/:search' component={AdministrationPageOrders} />
                <Route exact path='/administration/get/orders/:content' component={AdministrationPageOrders} />

                <Route exact path='/orders/:content/:search' component={OrdersPage} />
                <Route exact path='/orders/:content' component={OrdersPage} />

                <Route exact path='/application' component={SelectDevicePage} />
                <Route exact path='/application/pc' component={PcApplicationPage} />
                <Route exact path='/application/ios' component={iOSApplicationPage} />
                <Route exact path='/application/android' component={AndroidApplicationPage} />

                <Route exact path='/users/confirm/:id' component={RegistrationConfirmPage} />
                <Route exact path='/users/reset' component={ResendPasswordPage} />
                <Route exact path='/book/:id' component={ReaderPage} />
                <Route exact path='/product/:id' component={ProductPage} />
                <Route exact path='/settings' component={SettingsPage} />
                <Route exact path='/cart' component={Cartpage} />
                <Route exact path='/login/:action' component={LoginPage} />
                <Route path='/register/:action' component={RegisterPage} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/register' component={RegisterPage} />
                <Route path='/cart/checkout' component={CheckoutPage} />
            </Layout>
        </GlobalContext.Provider>
    );
}