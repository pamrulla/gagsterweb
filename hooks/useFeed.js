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
    // console.log("userSearch")
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
    console.log(args)
    await new Promise(r => setTimeout(r, 2000));
    console.log(args)
    return { 
        data: {
            Gags: [
                {
                    Id: 4,
                    First_name: "khan",
                    Last_name: "Patan",
                    User_id: 3,
                    Path: "3/hcazfikzmyr2qw3iuawi",
                    Price: 498,
                    Title: "asfd",
                    Description: "asfd",
                    Hearts: 0,
                    Width: 344,
                    Height: 468,
                    Tags: [
                        "xx",
                        "ww"
                    ]
                },
                {
                    Id: 4,
                    First_name: "khan",
                    Last_name: "khan",
                    User_id: 1,
                    Path: "1/c2odqadnsy1b36caoz2y",
                    Price: 100,
                    Title: "t3",
                    Description: "t4",
                    Hearts: 0,
                    Width: 344,
                    Height: 468,
                    Tags: [
                        "t1",
                        "t2"
                    ]
                },
                {
                    Id: 4,
                    First_name: "khan",
                    Last_name: "khan",
                    User_id: 1,
                    Path: "1/c2odqadnsy1b36caoz2y",
                    Price: 0,
                    Title: "t1",
                    Description: "t2",
                    Hearts: 0,
                    Width: 2672,
                    Height: 1801,
                    Tags: [
                        "t1",
                        "t2"
                    ]
                },
                {
                    Id: 4,
                    First_name: "khan",
                    Last_name: "khan",
                    User_id: 1,
                    Path: "1/c2odqadnsy1b36caoz2y",
                    Price: 0,
                    Title: "t1",
                    Description: "t2",
                    Hearts: 0,
                    Width: 2672,
                    Height: 1801,
                    Tags: [
                        "t1",
                        "t2"
                    ]
                },
                {
                    Id: 4,
                    First_name: "khan",
                    Last_name: "khan",
                    User_id: 1,
                    Path: "1/c2odqadnsy1b36caoz2y",
                    Price: 0,
                    Title: "t1",
                    Description: "t2",
                    Hearts: 0,
                    Width: 2672,
                    Height: 1801,
                    Tags: [
                        "t1",
                        "t2"
                    ]
                },
                {
                    Id: 4,
                    First_name: "khan",
                    Last_name: "khan",
                    User_id: 1,
                    Path: "1/c2odqadnsy1b36caoz2y",
                    Price: 0,
                    Title: "t1",
                    Description: "t2",
                    Hearts: 0,
                    Width: 2672,
                    Height: 1801,
                    Tags: [
                        "t1",
                        "t2"
                    ]
                },
                {
                    Id: 4,
                    First_name: "khan",
                    Last_name: "khan",
                    User_id: 1,
                    Path: "1/c2odqadnsy1b36caoz2y",
                    Price: 0,
                    Title: "t1",
                    Description: "t2",
                    Hearts: 0,
                    Width: 2672,
                    Height: 1801,
                    Tags: [
                        "t1",
                        "t2"
                    ]
                },
            ],
            "next_cursor": ""
        }, 
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
