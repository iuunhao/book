book {
    comments: {
        name: String,
        avatar: String,
        ip: String,
        address: String,
        message: String,
        createDate: Date,
        floor: Number,
        image: String,
        accessory: String,
        isShow: Boolean,
        reply: {
            message: String,
            createDate: Date,
            avatar: String,
            name: String,
            image: String,
            accessory: String
        }
    },
    users: {
        name: String,
        pwd: String,
        email: String,
        phone: String,
        createDate: Date,
        lastDate: Date,
        level: String
    }
}