import React from "react";
import "./App.scss";
import Posts from "./routes/posts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="d-flex p-2 mt-5 mb-5">
                <div className="container p-3">
                    <Switch>
                        <Route path="/" component={Posts} />
                    </Switch>
                </div>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
