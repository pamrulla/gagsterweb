import useSWR from "swr";

export function useFeed () {
    const { data, error } = useSWR(`feed`, fetcher)
    return {
      feed: data,
      isLoading: !error && !data,
      isError: error
    }
}

export function useSearch (search) {
    const { data, error } = useSWR(search, fetcher)
    return {
      feed: data,
      isLoading: !error && !data,
      isError: error
    }
}

export function useAuthor (id) {
    const { data, error } = useSWR(id, fetcher)
    return {
      feed: data,
      isLoading: !error && !data,
      isError: error
    }
}

async function fetcher(...args) {
    await new Promise(r => setTimeout(r, 2000));
    console.log(args)
    return { 
        data: {gags: [
            {
                path: "samples/landscapes/nature-mountains",
                hearts: "2",
                author: "khan1",
                authorId: 1,
                id: 1,
                title: "Title 1",
                price: 434.00,
                description: "Description 1",
                tags: "tags1",
            },
            {
                path: "v1618657140/test/meterbridge_k6aqmd",
                hearts: "1",
                author: "khan2",
                authorId: 1,
                id: 2,
                title: "Title 2",
                price: 434.00,
                description: "Description 2",
                tags: "tags",
            },
            {
                path: "sample",
                hearts: "201",
                author: "khan3",
                authorId: 1,
                id: 3,
                title: "Title 3",
                price: 434.00,
                description: "Description 3",
                tags: "tags",
            },
            {
                path: "t_homepage/samples/ecommerce/leather-bag-gray",
                hearts: "2.2m",
                author: "khan4",
                authorId: 1,
                id: 4,
                title: "Title 1",
                price: 434.00,
                description: "Description 1",
                tags: "tags",
            },
            {
                path: "t_homepage/samples/ecommerce/leather-bag-gray",
                hearts: "2.2m",
                author: "khan4",
                authorId: 1,
                id: 5,
                title: "Title 1",
                price: 434.00,
                description: "Description 1",
                tags: "tags",
            },
            {
                path: "t_homepage/samples/ecommerce/leather-bag-gray",
                hearts: "2.2m",
                author: "khan4",
                authorId: 1,
                id: 6,
                title: "Title 1",
                price: 434.00,
                description: "Description 1",
                tags: "tags",
            },
            {
                path: "t_homepage/samples/ecommerce/leather-bag-gray",
                hearts: "2.2m",
                author: "khan4",
                authorId: 1,
                id: 7,
                title: "Title 1",
                price: 434.00,
                description: "Description 1",
                tags: "tags",
            },
        ]}, 
        error: null
    }

    // fetch('http://localhost:8080/api/v1/login', requestOptions)
    //         .then(async response => {
    //             if(response.status != 200) {
    //                 const data = await response.json();
    //                 return Promise.reject(data.message);
    //             }
                
    //             const data = await response.json();
                
    //             this.setState({loginFailed: false});

    //             const { appState, updateAppData } = this.context
    //             appState.isLoggedIn = true
    //             appState.user = data.user
    //             appState.auth_token = data.auth_token
    //             updateAppData(appState)
    //             Router.replace("/upload")
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 loginFailed: true,
    //                 loginErrorMessage: error
    //             });
    //         });
}
