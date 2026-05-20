import Axios from 'axios';
import Mock from 'axios-mock-adapter';
import * as MockData from './AppMakeData';

/** Mock data */
if(process.env.NODE_ENV == "development") {

    let mock = new Mock(Axios);
    
    const withDelay = (delay, response) => config => {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(response);
            }, delay);
        });
    };

    /** Auth Mock Data */
    mock.onPost("/api/user").reply(
        withDelay(500, [
            200,
            {
                "success": {
                    "user": {
                        "id": 3,
                        "name": "Liam Drake Villamor",
                        "email": "liamdrake@yahoo.com",
                        "created_at": "2021-06-18 06:58:45",
                        "updated_at": "2021-06-18 06:58:45"
                    }
                }
            }
        ])
    );

    mock.onPost("/api/login").reply(
        withDelay(1300, [
            200,
            {
                "success": {
                    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk3MzFiNzlmMDcxYWQyYjk1MGYyOTY1MjMzNjkxZDBjMWYzODI2MDU5YTIzMTM3N2VhNjNkM2UxNjVkOWQ2ZDUzZDU4ZWQzZTgzYTc2OGVkIn0.eyJhdWQiOiIxIiwianRpIjoiOTczMWI3OWYwNzFhZDJiOTUwZjI5NjUyMzM2OTFkMGMxZjM4MjYwNTlhMjMxMzc3ZWE2M2QzZTE2NWQ5ZDZkNTNkNThlZDNlODNhNzY4ZWQiLCJpYXQiOjE2MjU5NzEwNjgsIm5iZiI6MTYyNTk3MTA2OCwiZXhwIjoxNjU3NTA3MDY4LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.LGNwRyYy9T7PjhPBlM-oMm2SsxdX3Fmm8ZgvUAxV78OXmqoWdoFYDq2a42Bz6MnGf4ThQwd5HJpYDpl8bi1gHyvuPEonOU5agIqmApP04olMI85hdDNln9xUOzrFbDjuE6JnPJuNP-qZIq7yaFoMNYplr5uUoomWOn5gfHMiSTsdMv-3mF7lQkWsKQBEypTyAplUKjcOv3uNh9Zk3TayAxao93l_ghZZU1lqEjIdAmbu8AW81CyNXybIIhvYzHJm0nbRF-bAk5rSaN1l8WEfrGRUNPUTSYTVWy4UTmszc6Jd0Pzv6RIDJTjbiKM1zyYOtJgzm-ZI5FWGSER8QQS_2svDvCdz3G59HiTh0nXN60vGyJdWrJGGate53G_tJ3ibmgEW3-lNkHRUSMO8KOh1-bGOMo2IXe72v9juoJwOIMnPDme-p27eaUVcI9xyxQkCvv3lRv9hJ_AvaJS7wQ1vYe_tnG9N-gSGCKUioJSzm8vOlNmzel63vG5n4ApEtWec1ZqfF_HmNUMtX26vPy-eawj80GRErQCQijjymkxtq8LHj53I7KbGOgcMibkDczYhv39nCzFEfFEiktu84DiA_Kqf0R5RkAWwKiZozMaRxFKmJod6W-wR5vgP8RHKzB8bWd8lIWqoHN1Vom7VkIPkjNHRF3GjISlQeiEaet3CgOg",
                    "user": {
                        "id": 3,
                        "name": "Liam Drake Villamor",
                        "email": "liamdrake@yahoo.com",
                        "created_at": "2021-06-18 06:58:45",
                        "updated_at": "2021-06-18 06:58:45"
                    }
                }
            }
        ])
    );

    mock.onPost("/api/logout").reply(
        withDelay(500, [
            200,
            {
                "success": "Logout successful"
            }
        ])
    );

    mock.onGet("/api/todo-list/read").reply(
        withDelay(500, [
            200,
            {
                "success": {
                    "tasks": [
                        {
                            "id": 35,
                            "user_id": 3,
                            "task": "The quick brown fox jumps over the lazy dog behind the fence",
                            "status": "new",
                            "order": 1,
                            "created_at": "2021-07-24 00:18:20",
                            "updated_at": "2021-07-24 00:18:20"
                        },
                        {
                            "id": 37,
                            "user_id": 3,
                            "task": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt id ligula ut dictum. Pellentesque blandit arcu a massa egestas, sed maximus nisi rutrum. Donec tristique velit eu tortor finibus pellentesque.",
                            "status": "new",
                            "order": 2,
                            "created_at": "2021-07-24 00:22:02",
                            "updated_at": "2021-07-24 00:22:02"
                        },
                        {
                            "id": 38,
                            "user_id": 3,
                            "task": "Aliquam tincidunt id ligula ut dictum. Pellentesque blandit arcu a massa egestas, sed maximus nisi rutrum. Donec tristique velit eu tortor finibus pellentesque.",
                            "status": "new",
                            "order": 2,
                            "created_at": "2021-07-24 00:22:09",
                            "updated_at": "2021-07-24 00:22:09"
                        }
                    ],
                    "tasksInfo": []
                }
            }
        ])
    );

    mock.onPost("/api/todo-list/init").reply(
        withDelay(1000, [
            200,
            {
                "success": {
                    "app_data": {
                        "success": true,
                        "user_info": {
                            "id": 3
                        }
                    }
                }
            }
        ])
    );

    mock.onPost("/api/mock/data_table").reply(
        (config) => {
            const urlParams = new URLSearchParams(config.data);
            let pageSize = urlParams.get('page_size');
            let pageIndex = urlParams.get('page_index');
            let delay = Math.ceil(Math.random() * 1000);
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve([
                        200,
                        {
                            success : {
                                data : {
                                    total : 500,
                                    result : MockData.RemoteData(...[pageSize,pageIndex])
                                }
                            }                            
                        }
                    ]);
                }, delay);
            });
        }
    );
}

/**
 * Basic Auth is activated on the server
 */

 /** JSON Server */
export const dev = Axios.create({
    baseURL: "http://localhost:8001",
    timeout: 5000,
    headers: {
        'Accept': 'application/json'
    }
});

/** 
 * Dev server 
 * Note : get auth token in session 
 */
export const prod = Axios.create({
    baseURL: "http://dev.jovanjay.com",
    timeout: 10000,
    credentials: 'same-origin'
});