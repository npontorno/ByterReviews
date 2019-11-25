export default
[
    {
        id: 0001,
        first: "fname",
        last: "lname",
        email: "address",
        password: "pass",
        isOwner: false,
        postCount: 2,
        posts:
        [
            {
                id: 3331,
                itemId: 2221,
                body: "some text about restaurant",
                rating: 5,
                upvotes: 0,
                timeStamp: "mm/dd/yyyy"
            },

            {
                id: 3332,
                itemId: 2222,
                body: "some more text about a different restaurant",
                rating: 2,
                upvotes: 3,
                timeStamp: "mm/dd/yyyy"
            }
        ]
    },

    {
        id: 0002,
        first: "fname2",
        last: "lname2",
        email: "address2",
        password: "pass2",
        isOwner: true,
        postCount: 0,
        posts: []
    }
]