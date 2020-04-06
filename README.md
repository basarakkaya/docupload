# docupload

Mini Front-end & Back-end Project, using ReactJS and ExpressJS.
Allows you to upload files to IBM Cloud Object Storage.

run `npm install` and `npm start` consquently, within both `docapi` and `docapp` folders to start using.

> You must have an IBM Cloud Account with IBM COS Subscription to use this app. Also, you must specify some service credentials within `.env` file under `docapi` folder.

> You must specify API Endpoint within `.env` file under `docapp` folder.

## Setting Environment Variables

> ### Example `docapi/.env`
> IBM_COS_ENDPOINT=<< public endpoint of bucket under Buckets>Configuration>Endpoints>Public >>
> IBM_COS_APIKEYID_WRITER=<< "apikey" under "Service Credentials" >>
> IBM_COS_APIKEYID_READER=<< "apikey" under "Service Credentials" >>
> IBM_AUTH_ENDPOINT=https://iam.cloud.ibm.com/identity/token
> IBM_AUTHSERVICE_INSTANCEID=<< Bucket Instance CRN under Buckets>Configuration>Bucket Details >>
> IBM_COS_HMAC_KEYID=<< HMAC Keys under "Service Credentials" >>
> IBM_COS_HMAC_ACCESSKEY=<< HMAC Keys under "Service Credentials" >>
>
> POSTGRES_HOST=<< database host >>
> POSTGRES_DB_NAME=<< database name >>
> POSTGRES_USERNAME=<< username >>
> POSTGRES_PASSWORD=<< password >>
> POSTGRES_PORT=<< database port >>

> ### Example `docapp/.env`
> REACT_APP_APIENDPOINT=<< your `docapi` endpoint >>

## Deployment to CloudFoundry

You need to create `manifest.yml` files under both `docapi` and `docapp` folders to deploy to CloudFoundry. After creating these files, login to `cf` from cli, running the command `cf login`. After logging in, run `cf push` under both `docapi` and `docapp` folders.

> ### Example `docapi/manifest.yml`
> applications:
> \- name: docupload-api
>   path: ./
>   random-route: false
>   memory: 128M
>   instances: 1
>   buildpack: https://github.com/cloudfoundry/nodejs-buildpack.git
>   space: dev
>   command: npm start
>   env:
>     IBM_COS_ENDPOINT=<< public endpoint of bucket under Buckets>Configuration>Endpoints>Public >>
>     IBM_COS_APIKEYID_WRITER=<< "apikey" under "Service Credentials" >>
>     IBM_COS_APIKEYID_READER=<< "apikey" under "Service Credentials" >>
>     IBM_AUTH_ENDPOINT=https://iam.cloud.ibm.com/identity/token
>     IBM_AUTHSERVICE_INSTANCEID=<< Bucket Instance CRN under Buckets>Configuration>Bucket Details 
>     IBM_COS_HMAC_KEYID=<< HMAC Keys under "Service Credentials" >>
>     IBM_COS_HMAC_ACCESSKEY=<< HMAC Keys under "Service Credentials" >>
>     POSTGRES_HOST=<< database host >>
>     POSTGRES_DB_NAME=<< database name >>
>     POSTGRES_USERNAME=<< username >>
>     POSTGRES_PASSWORD=<< password >>
>     POSTGRES_PORT=<< database port >>

> ### Example `docapp/manifest.yml`
> applications:
> \- name: docupload-app
>   path: ./
>   random-route: false
>   memory: 256M
>   instances: 1
>   buildpack: https://github.com/cloudfoundry/nodejs-buildpack.git
>   space: dev
>   command: npm start
>   health-check-type: process
>   env:
>     REACT_APP_APIENDPOINT: << your `docapi` endpoint >>