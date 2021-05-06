import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import * as actionTypes from "store/posts/postActionTypes";
import { selectPosts } from "store/selectors/posts";
import gate from "gate";

import "./posts.scss";
import Loader from "components/Loader";
import Filter from "components/Filter";

function Posts() {

    const [filter, setFilter] = useState({ country: '', department: '' });

    const dispatch = useDispatch();

    const store = useSelector((selectPosts));

    const postsData = store.postsList;

    const countries = store.countries;

    const departments = [...new Set(postsData.map(item => item.department.label))];

    const matchCountry = (countryCode) => {
        return countries.find(co => co.alpha2Code === countryCode.toUpperCase()).name;
    }

    let data = postsData.filter(item => {
        return (filter.country === '' ? true : matchCountry(item.location.country).toLowerCase().includes(filter.country)) &&
            (filter.department === '' ? true : item.department.label.toLowerCase().includes(filter.department));
    });

    useEffect(() => {
        const fetch = async () => {
            dispatch({ type: actionTypes.START_POSTS_FETCH })
            const postsList = await gate.fetchPosts()
            const countries = await gate.fetchCountries()

            const payload = {
                postsList: postsList?.content,
                countries: countries,
            };
            dispatch({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: payload });
        };
        fetch();
    }, [dispatch]);

    const filterHandler = (country, department) => {
        setFilter({ country: country, department: department });
    }

    const getJobTitle = name => name.split('-')[0];

    if (store.loading) return <Loader />;
    return (
        <>
            <h1 className="posts-title p-3">SmartRecruiters Positings List App</h1>
            <Filter getFilterValues={filterHandler} countries={countries} departments={departments} />
            <div className="container jobs-list">
                {
                    data.length === 0 ? <div>Nothing found! Please try a different search</div> :
                        data.map((post, index) => {
                            return (
                                <div className="row" key={post.id}>
                                    <NavLink className="job" to={`Posts/${post.id}`}>
                                        <h3 className="job-title">{getJobTitle(post.name)}</h3>
                                        <div className="job-details">
                                            {post.location.city}, - {matchCountry(post.location.country)}
                                        </div>
                                    </NavLink>
                                </div>
                            );
                        })
                }
            </div>
        </>
    );
}

export default Posts;
