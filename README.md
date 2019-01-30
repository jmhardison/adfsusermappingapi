# ADFS User Mapping API

[![Greenkeeper badge](https://badges.greenkeeper.io/jmhardison/adfsusermappingapi.svg)](https://greenkeeper.io/)

ADFS User Mapping API backend for returning a UPN of input value. (Proof of Concept)

This tool was quickly put together to prove the concept of altering a user account that is entered into a username field in the ADFS portal authenticaiton, and transforming it into a different ID.

A use case in this tool is for those with multiple public domains, and a public AD domain name. Users may not be aware of the internal AD domain name in use and try to use their email address. (Could be domaina.com for one user, and domainb.com for another. Both however have internaldomain.com) As a safety net for those users when training is not completed, this service can 'fix-up' the username to the correct internal domain UPN. Each user is created in the API service and stored in MongoDB. The user's real address is linked to one or more alternative ID's. A get on the altid endpoint using one of the alternative ID's will result in the real id being returned to the caller.

## DEVELOPMENT

This API is built using:

* NodeJS
* Express
* Mongoose

## DEPLOYMENT

The API service is a simple NodeJS API, that relies on the existance of MongoDB. You can deploy through Heroku, Azure, or any other mechanism, and provide the following environment variables to drive aspects of the service.

* `PORT` - The port you want the API to listen on. Heroku defines this for you, but other services will require it set.
* `MONGOSTRING` - The connection string for mongo service.

Changes to ADFS require the creation of a custom theme and the import of a modified onload.js file.

## GET REAL ID FROM ALT ID

* Method: GET
* Path: /v1/user/altid/email/:AlternateEmail

Replacing `:AlternateEmail` with the email address representing an alternate address for a user will have the service either return the users real id if they exist int he DB mappings, or echo back what the user put in if not found.

## GET REAL ID OBJECT FROM REAL ID

* Method: GET
* Path: /v1/user/email/:RealEmail

Replacing `:RealEmail` with the users real email address will return the object of that user.

## GET STATUS

* Method: GET
* Path: /v1/status

Returns `{ "status": "Running" }` when service is in an operational state.

## CREATE NEW REAL USER

* Method: POST
* Path: /v1/user
* Content-Type: application/json
* Body: `{ "realid": ":RealEmail" }`

Replacing :RealEmail in the body being POST to the service will result in the user object being created in the DB.

## CREATE NEW ALT ID FOR REAL USER

* Method: POST
* Path: /v1/user/altid/:RealUserID
* Content-Type: application/json
* Body: { "email": ":AlternateEmail" }

Replacing `:RealUserID` with the object ID of the real user, and `:AlternateEmail` with the alternative email address you wish to map, will add a alternate address in the database and associate it to the real user as an alternate address.