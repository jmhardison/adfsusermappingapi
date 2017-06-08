////////////////////////////////////////
// ADFSUserMappingAPI
//
// Copyright (c) 2017 Jonathan Hardison
// /config/index.js
////////////////////////////////////////

export default {
    "bodyLimit": "100kb",
    "port": process.env.PORT,
    "mongourl": process.env.MONGOSTRING //mongodb://user:pass@localhost:27017/simplyticket?authSource=admin
}