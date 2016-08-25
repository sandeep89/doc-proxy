# Doc-proxy

A node proxy server which generates blueprint documentations of all the requests which are forwarded using the server.

## Setup

### Prerequisites

Node version > 0.10.31 should be installed on the machine where you are trying to run the server. 

NPM should be available on the machine to deploy the server

### Installation

3 easy steps to setup this server 

1. Check out code using git `git checkout git@github.com:sandeep89/doc-proxy.git`.
2. Install NPM project dependencies using `npm install` in the <b>doc-proxy</b> folder.
3. Run the server with `node bin/www` in the <b>doc-proxy</b> folder.

Note:- last command will try to run the server on PORT 3000, if this port is beeing used by anyother application please use env variable PORT to change the port of running the server, eg. to run the server on port 3001 use `PORT=3001 node bin/ww` to start the server 

### Usage
To log a documentation of an api send a request (currently POST, PATCH, GET and DELETE are supported) to the server at `/proxy` with parameter `url`.

Eg. To create documentation for endpoint /abc running on server https://www.xyz.test.com, send the request as `http://localhost:3000/proxy?url=https://www.xyz.test.com/abc`.

This request would either create a file document.yml in <b>doc-proxy</b> folder or it will append the outgoing query/body and any attached headers along with incoming response from server

Below is a sample output in document.yml file

```
# POST /abc
+ Request
    + Headers

            accept:application/json
            content-type:application/x-www-form-urlencoded


+ Response 200
    + Headers

            content-type:application/json; charset=utf-8
            date:Thu, 05 May 2016 15:09:34 GMT

    + Body

            {"id":1662,"test":"APA91bHGTOeJcGdcluMlFpO751wX4oEMTCvVIuZib-cBJ01uGJkOjN7E6jzgIsUDkXbsfZSfawTICF5XwrQaXE5AbdVQymltohyIauQD5hTm2UEgZEl_N5qb0lUZnOLbZjh8-Xyx0ijM"}

```

Note that the generated doc is complient to blueprint and could be safly used in https://apiary.io to generate documentation barebone

### Testing
To run the test cases follow below step
1. `npm install --global mocha` (Install mocha so that it becomes a command line utility)
2. `npm instal` 
3. `mocha test`

# Support
For any quries please drop a note to s4n989@gmail.com

# TODO
Integrate apiary cli to push the api documentation directly to apiary.io
https://help.apiary.io/tools/apiary-cli/
