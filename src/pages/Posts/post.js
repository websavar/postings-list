import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Markup } from 'interweave';
import "./posts.scss";
import gate from "gate";
import Loader from "components/Loader";

import * as actionTypes from "store/posts/postActionTypes";
import { selectPosts } from "store/selectors/posts";
import { useSelector, useDispatch } from "react-redux";

const Post = () => {
    const [postdata, setData] = useState({});

    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPostData = async (id) => {
            dispatch({ type: actionTypes.START_POSTS_FETCH })
            const countries = await gate.fetchCountries();
            const payload = { countries: countries };

            const postdata = await gate
                .fetchPost(id)
                .catch(e => console.log(e))
            setData(postdata);

            dispatch({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: payload });
        };
        fetchPostData(id);
    }, [id, dispatch]);

    const store = useSelector(selectPosts);

    const countries = store.countries;

    const matchCountry = (countryCode) => {
        return countries.find(co => co.alpha2Code === countryCode?.toUpperCase())?.name;
    }

    const showJob = () => {
        return (
            <>
                <div className="mb-4">
                    <h1 className="page-title">{postdata.name}</h1>
                    <div className="job-details">
                        {postdata.location?.city}, {matchCountry(postdata.location?.country)}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="title">{postdata.jobAd?.sections?.jobDescription?.title}</div>
                    <Markup content={postdata.jobAd?.sections?.jobDescription?.text} />
                    <Markup content={postdata.jobAd?.sections?.qualifications?.text} />
                </div>
            </>)
    }

    if (store.loading) return <Loader />;
    return (
        <>
            <div className="mb-5">
                <NavLink to="/" className="backward">
                    &#8592; back to the list
                </NavLink>
            </div>
            { postdata === undefined ? 'Something went wrong!' : showJob()}
        </>
    );
};

export default Post;
