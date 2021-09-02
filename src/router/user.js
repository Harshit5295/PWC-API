const express = require('express');
const User = require('../model/user');
const axios = require('axios').default;

const router = new express.Router();

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({
            message: 'Fetched successfully.',
            data: users
        });
    }
    catch {
        throw new Error('Something went wrong!!')
    }
});

router.post('/insert-users', async (req, res) => {
    let userData = [];
    try {
        await axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
            if(res.status === 200) {
                res.data.map((user) => {
                    const { id, name, username,email,phone,website, company, address } = user;
                    userData.push({
                        id,
                        name,
                        username,
                        email,
                        phone,
                        website,
                        company: {
                            name: company.name,
                            catchPhrase: company.catchPhrase,
                            bs: company.bs
                        },
                        address: {
                            street: address.street,
                            suite: address.suite,
                            city: address.city,
                            zipCode: address.zipcode,
                            geo: {
                                lat: address.geo.lat,
                                lon: address.geo.lng
                            }
                        }
                    })
                })
            }
            else throw new Error('Error While fetching data from 3rd party API.');
        })
        await User.insertMany(userData);
        res.status(200).send('Data Imported!!');
    }
    catch {
        throw new Error('Something went wrong!!')
    }
});

router.get('/users/:searchTerm', async(req, res) => {
    const searchedValue = req.params.searchTerm;
    let regex = new RegExp(searchedValue, 'i');
    const filteredData = await User.find({
        $or: [
            {name: regex},
            {email: regex},
            {website: regex},
            {phone: regex},
            {username: regex},
            {"company.name": regex},
            {"address.zipCode" : regex},
            {"address.street" : regex},
            {"address.suite" : regex},
            {"address.city" : regex},
        ]
    })
    res.status(200).send(filteredData);
});

module.exports = router;