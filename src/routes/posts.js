import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import PostsList from "../pages/Posts/posts";
import Post from "../pages/Posts/post";
import NotFoundPage from "pages/NotFoundPage";

function Posts() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PostsList} />
                <Route path="/Posts/:id" component={Post} />
                <Route path="" component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Posts;
