import Layout from './pages/Admin/Layout/Layout';
import AppLayout from './components/user/Layout/AppLayout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes, userRoutes, myTestPages } from './routes/AppRoutes';
import DataOnlyComponent from './global-api-call'
import { Fragment } from 'react';
function App() {
    return (
        <Router>
            <div className="App">
                <DataOnlyComponent />

                <Routes>

                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let _Layout = Layout;
                        if (route.layout) {
                            _Layout = route.layout;
                        } else if (route.layout === null) {
                            _Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <_Layout>
                                        <Page />
                                    </_Layout>
                                }
                            />
                        );
                    })}
                    {userRoutes.map((route, index) => {
                        const Page = route.component;
                        let _Layout = AppLayout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <_Layout>
                                        <Page />
                                    </_Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;