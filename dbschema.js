db = {
  user: [
    {
      userId: "dh23ggj5h32g543j5gf43",
      email: "user@email.com",
      handle: "user",
      createdAt: "2020-09-21T07:06:12.383Z",
      imageUrl: "image/sdfsdgsdfdsfsdhdss/dgasdasdf",
      bio: "Hello,my name is user,nice to meet you",
      website: "https://user.com",
      location: "London, UK",
    },
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is the scream body",
      createdAt: "2020-09-17T07:43:11.261Z",
      likeCount: 5,
      commentCount: 3,
    },
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'kdjsfgdksuufhgkdsufky',
      body: 'nice one mate!',
      createdAt: '2020-09-25T04:17:14.813Z'
    }
  ],
  notifications: [
    {
      recipient: 'user',
      sender: 'john',
      read: 'true | false',
      screamId: 'kdsfsdigjsdgsdjgskdgjjkdg',
      type: 'like | comment',
      createdAt: '2020-10-04T02:17:24.229Z'
    }
  ]
};

const userDetails = {
  // Redux data
  credentials: {
    userId: "N43KJ5H43KJHREW4J5H3JWMERHB",
    email: "user@email.com",
    handle: "user",
    createdAt: "2019-03-15T10:59:52.798Z",
    imageUrl: "image/dsfsdkfghskdfgs/dgfdhfgdh",
    bio: "Hello, my name is user, nice to meet you",
    website: "https://user.com",
    location: "Lonodn, UK",
  },
  likes: [
    {
      userHandle: "user",
      screamId: "hh7O5oWfWucVzGbHH2pa",
    },
    {
      userHandle: "user",
      screamId: "3IOnFoQexRcofs5OhBXO",
    },
  ],
};
