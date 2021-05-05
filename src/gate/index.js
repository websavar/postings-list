import { postApi, countryApi } from "./api";

const errorHandler = (err) => {
    if (err.response) {
        // client received an error response (5xx, 4xx)
        if (err.response.status === 404) console.log('Request failed; API address not found!');
        if (err.response.status === 500) console.log('Internal server error!');
    } else if (err.request) {
        console.log('Client never received a response, or request never left');
    } else {
        console.log('Error: ', err);
    }
}

const posts = {
    fetchPosts: async () => {
        const result = await postApi
            .get("postings?limit=100")
            .catch(error => errorHandler(error));

        return result?.data;
    },
    fetchPost: async (postid) => {
        const result = await postApi
            .get("postings/" + postid)
            .catch(error => errorHandler(error));

        return result?.data;
    },
};

const countries = {
    fetchCountries: async () => {
        let countries = JSON.parse(localStorage.getItem('countries'));
        if (countries != null && countries !== undefined) return countries;
        const result = await countryApi
            .get()
            .catch(error => errorHandler(error));
        localStorage.setItem('countries', JSON.stringify(result?.data));

        return result?.data;
    },
}

export default { ...posts, ...countries };
