db.createUser(
    {
        user: "NisargSaple",
        pwd: "Nisarg@123",
        roles: [
            {
                role: "readWrite",
                db: "mongodb_crud"
            }
        ]
    }
)