async function usersCreate(request, response) {

    //just for testing async requests handling
    const { email, password } = await new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(request.body);
            }catch(err) {
                reject(err);
            }
        }, 4000);
    });
    response.code(201).send({email: email, message: "user created sucessfull!"});
}



module.exports = usersCreate;