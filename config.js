require('dotenv').config();

const config = {
    email1: process.env.EMAIL,
    pass1: process.env.PASSWORD,
    email2: process.env.EMAIL2,
    pass2: process.env.PASSWORD2
}

module.exports = config;