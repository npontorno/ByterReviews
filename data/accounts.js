export let array =
[
    {
        id: 1111,
        first: "fname",
        last: "lname",
        email: "address",
        password: "pass",
        isOwner: false,
        postCount: 2,
        posts:
        [
            {
                id: 4441,
                itemId: 3331,
                body: "some text about restaurant",
                rating: 5,
                upvotes: 0,
                timeStamp: "mm/dd/yyyy"
            },

            {
                id: 4441,
                itemId: 3331,
                body: "some more text about a different restaurant",
                rating: 2,
                upvotes: 3,
                timeStamp: "mm/dd/yyyy"
            }
        ]
    },

    {
        id: 1112,
        first: "fname2",
        last: "lname2",
        email: "address2",
        password: "pass2",
        isOwner: true,
        postCount: 0,
        posts: []
    }
]