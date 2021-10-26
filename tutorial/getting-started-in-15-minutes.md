# Getting started in 15 minutes

### Introduction

The tutorial is to help you understand the basic usage of our server kits and how to integrate it into your software by implementing a simple issuer/verifier service.

The issuer/verifier service to be implemented have the following functions:

* Issue VCs and VPs with name information ([`NameCredentialV1`](../schemas/name.md#namecredentialv1)) as a data type and display them on the screen.
* Verify the VCs and VPs and display the verification result on screen.

![Issue and Verify the VCs and VPs with name information](<../.gitbook/assets/Kapture 2021-02-28 at 17.34.34.gif>)

### Prerequisites

In our server kits, a digital wallet (private keys, etc.) created by our Nodejs SDK will be stored in the MongoDB in an encrypted form. So, you need to prepare MongoDB either in the cloud or in a local environment.

| Key         | Value       |
| ----------- | ----------- |
| Destination | `127.0.0.1` |
| Port        | `27701`     |
| User Name   | `username`  |
| Password    | `password`  |

The connect string to MongoDB for the above conditions is as follows:

```
mongodb://username:password@127.0.0.1:27017
```

### Tutorial Flow

In this tutorial, we will work through the following steps.

1. Creating a NodeJS project
2. Install dependencies
3. Application implementation and execution settings
4. Implementation of basic server functions
5. Implementing the Issuer function
6. Implementing the Verifier function

### 1. Creating NodeJS project

{% tabs %}
{% tab title="Shell" %}
```bash
# create a project directory
mkdir awesome-project
cd awesome-project

# create NodeJS project
yarn init -y
```
{% endtab %}
{% endtabs %}

### 2. Install dependencies

Install the dependency libraries required to implement and run the project, in order.

{% tabs %}
{% tab title="Shell" %}
```bash
### I. Libraries for implementing

# UNiD SDK
yarn add @getunid/node-wallet-sdk
yarn add @getunid/wallet-sdk-mongo-connector

# Server
yarn add express

# Validation
yarn add express-validator

# Access log
yarn add morgan

# Web security
yarn add helmet

# Handler templates
yarn add handlebars
yarn add express-handlebars

# MongoDB client
yarn add mongodb

# HTTP status code
yarn add http-status-codes

### II. Libraries for running

yarn add -D ts-node
yarn add -D typescript
yarn add -D @types/express
yarn add -D @types/morgan
yarn add -D @types/helmet
yarn add -D @types/express-handlebars
yarn add -D @types/mongodb
yarn add -D @types/node
```
{% endtab %}
{% endtabs %}

### 3. Application implementation and execution settings

In this project, we will use TypeScript to implement the application.

{% hint style="info" %}
The project itself can be implemented in pure JavaScript without using TypeScript, but since UNiD nodejs SDK provides type definition information, so you can have a more intuitive programming experience by using TypeScript.
{% endhint %}

Configure the initial settings for TypeScript.

{% tabs %}
{% tab title="Shell" %}
```bash
npx tsc --init
```
{% endtab %}
{% endtabs %}

The package.json file contains the minimum configuration required to run a TypeScript-based project.

{% tabs %}
{% tab title="package.json" %}
```diff
--- a/package.json	2021-02-27 13:07:03.000000000 +0900
+++ b/package.json	2021-02-27 13:08:54.000000000 +0900
@@ -3,6 +3,10 @@
   "version": "1.0.0",
   "main": "index.js",
   "license": "MIT",
+  "scripts": {
+    "ts-node": "npx ts-node",
+    "start": "npx ts-node src/server.ts"
+  },
   "dependencies": {
     "debug": "^4.3.1",
     "dotenv": "^8.2.0",
```
{% endtab %}
{% endtabs %}

### 4. Implementation of basic server functions

Before implementing the server functions, let's understand how to run the application.

{% tabs %}
{% tab title="Shell" %}
```bash
yarn start
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
When you run the yarn start command at this time, you will get a runtime error. The reason for the error is that the file required for execution, which will be created in the next step, does not exist yet, so do not worry about it and proceed to the next step.
{% endhint %}

Let's create a source code directory and a file that will serve as an entry point and implement basic server functions.

{% tabs %}
{% tab title="Shell" %}
```bash
# Make a source code directory
mkdir src
cd src

# entry point
touch server.ts
```
{% endtab %}
{% endtabs %}

Open the `server.ts` file in your preferred IDE or text editor and proceed with the implementation. For this tutorial, we recommend using [VSCode](https://code.visualstudio.com).

![Open server.ts file with VSCode](<../.gitbook/assets/image (6).png>)

Let's implement the basic server functions. In this section, we will implement two URLs to handle the `GET` method and two URLs to handle the `POST` method. Specifically, we will implement the Issuer function and the Verifier function in the following URLs.

| URI              | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
| `GET /issuer`    | Display the input form for the data to be put into VC/VP on the screen. |
| `POST /issuer`   | Create VC/VP and display them on the screen.                            |
| `GET /verifier`  | Display the input form for the VC/VP to be verified on the screen.      |
| `POST /verifier` | Verify the VC/VP and display verification results and payload.          |

Sample skeleton of basic server functions as follow:&#x20;

{% tabs %}
{% tab title="src/server.ts" %}
```typescript
import http from 'http'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import handlebars from 'express-handlebars'
import { validationResult, ValidationChain } from 'express-validator'
import { AddressInfo } from 'net'
import { KeyRingType, UNiD } from '@getunid/node-wallet-sdk'
import { MongoClient } from 'mongodb'
import HttpStatus from 'http-status-codes'
import { UNiDDid } from '@getunid/node-wallet-sdk/libs/did-unid/did'
import { MongoDBConnector } from '@getunid/wallet-sdk-mongo-connector'

const app = express()

// setting up basic middleware
app.use(morgan('combined'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// setting up rendering engine
app.engine('handlebars', handlebars({ defaultLayout: undefined }))
app.set('view engine', 'handlebars')

const server = http.createServer(app)

// creates and sets the DID when the application starts
let DID: UNiDDid | undefined = undefined

// define validators
const validator = (chains: Array<ValidationChain>): express.RequestHandler => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        await Promise.all(chains.map((chain) => { return chain.run(req) }))

        const errors = validationResult(req)

        if (errors.isEmpty()) {
            return next()
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({
                errors: errors.array({ onlyFirstError: true })
            })
        }
    }
}

// define request handlers

// GET /issuer
const issuerGetHandler = (): Array<express.RequestHandler> => {
    return [
        validator([
        ]),
        async (req, res, next) => {
            try {
                return res.status(HttpStatus.OK).render('issuer/get', {
                    title: 'Issuer',
                })
            } catch (err) {
                return next(err)
            }
        }
    ]
}

// POST /issuer
const issuerPostHandler = (): Array<express.RequestHandler> => {
    return [
        validator([
        ]),
        async (req, res, next) => {
            try {
                return res.status(HttpStatus.OK).render('issuer/post', {
                    title: 'Issuer',
                })
            } catch (err) {
                return next(err)
            }
        }
    ]
}

// GET /verifier
const verifierGetHandler = (): Array<express.RequestHandler> => {
    return [
        validator([
        ]),
        async (req, res, next) => {
            try {
                return res.status(HttpStatus.OK).render('verifier/get', {
                    title: 'Verifier',
                })
            } catch (err) {
                return next(err)
            }
        }
    ]
}

// POST /verifier
const verifierPostHandler = (): Array<express.RequestHandler> => {
    return [
        validator([
        ]),
        async (req, res, next) => {
            try {
                return res.status(HttpStatus.OK).render('verifier/post', {
                    title: 'Verifier',
                })
            } catch (err) {
                return next(err)
            }
        }
    ]
}

// regist the request handlers
app.get('/issuer', issuerGetHandler())
app.post('/issuer', issuerPostHandler())

app.get('/verifier', verifierGetHandler())
app.post('/verifier', verifierPostHandler())

// define error handler
const notFoundErrorHandler = (): express.RequestHandler => {
    // 404
    return (req, res, next) => {
        return res.status(HttpStatus.NOT_FOUND).json({
            message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        }).end()
    }
}

const defaultErrorHandler = (): express.ErrorRequestHandler => {
    // 500
    return (err, req, res, next) => {
        console.error(`ERROR: ${ err.stack || err }`)

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        }).end()
    }
}

// register the error handler
app.use(notFoundErrorHandler())
app.use(defaultErrorHandler())

// server: event handler
server.on('error', (err: Error) => {
    console.error(`ERROR: ${ err.stack || err }`)
})

server.on('listening', () => {
    const isAddressInfo = (object: any): object is AddressInfo => {
        return object
    }

    const address = server.address()

    if (isAddressInfo(address)) {
        console.log(`Listening on ${ [ address.address, address.port ].join(':') }`)
    }
});

// server: run
(async () => {
    try {
        const mongoUri      = '${MONGODB_URI}'
        const clientId      = '${CLIENT_ID}'
        const clientSecret  = '${CLIENT_SECRET}'
        const encryptionKey = '${ENCRYPTION_KEY}'
        
        // connect to mongodb
        const client = new MongoClient(mongoUri)

        await client.connect()
        
        // make connector (wrap mongodb connection)
        const connector = new MongoDBConnector({
            client       : client,
            encrypter    : Cipher.encrypt,
            decrypter    : Cipher.decrypt,
            encryptionKey: encryptionKey,
        })

        // initialize UNiD sdk
        UNiD.init({
            clientId     : clientId,
            clientSecret : clientSecret,
            connector    : connector,
        })

        // create new DID (wallet)
        DID = await UNiD.createDid(KeyRingType.Mnemonic)

        // start application server
        server.listen(18080, '127.0.0.1')
    } catch (err: any) {
        console.error(`ERROR: ${ err.stack || err }`)
    }
})()
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
See the table below for the`${MONGODB_URI}`,`${CLIENT_ID}`,`${CLIENT_SECRET}`,`${ENCRYPTION_KEY}`variables included in the snippet.
{% endhint %}

| Variable            | Description                                                                                                                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `${MONGODB_URI}`    | <p>Connection string to MongoDB<br><code>mongodb://username:password@127.0.0.1:27017</code></p>                                                                                                      |
| `${CLIENT_ID}`      | Set the `Client ID` provided by the UNiD Network                                                                                                                                                     |
| `${CLIENT_SECRET}`  | Set the `Client Secret` provided by the UNiD Network                                                                                                                                                 |
| `${ENCRYPTION_KEY}` | <p>Sets the key used to encrypt the data in MongoDB. Can be any randomly generated <strong>64-digit string in hexadecimal notation</strong>.</p><p></p><p>e.g. <code>openssl rand -hex 32</code></p> |

Let's continue to implement each endpoint such as VC/VP creation and validation. Before moving on to the next step, let's prepare a directory to store the HTML template for the page display and its template.

{% tabs %}
{% tab title="Shell" %}
```bash
# MEMO: CWD is awesome-project/src

# Views directory
mkdir -p ../views/{issuer,verifier}

# GET /issuer
touch ../views/issuer/get.handlebars

# POST /issuer
touch ../views/issuer/post.handlebars

# GET /verifier
touch ../views/verifier/get.handlebars

# POST /verifier
touch ../views/verifier/post.handlebars
```
{% endtab %}
{% endtabs %}

### 5. Implementation Issuer functions

The following is a snippet of HTML and TypeScript to implement the Issuer function. Note that this project uses a template engine called [Handlebars](https://handlebarsjs.com) as the HTML for displaying pages. For more details on the notation and decorators available in the template, we recommend you refer to the official Handlebars website.

{% tabs %}
{% tab title="views/issuer/get.handlebars" %}
```markup
<html>
    <head>
        <title>{{title}}</title>
    </head>
    <body>
        <header>
            <h2>{{title}}</h2>
        </header>
        <article>
            <form action="/issuer" method="POST">
                <p>
                    <label for="familyName" style="display: block; font-weight: bold;">familyName:</label>
                    <input type="text" name="familyName" id="familyName" />
                </p>
                <p>
                    <label for="givenName" style="display: block; font-weight: bold;">givenName:</label>
                    <input type="text" name="givenName" id="givenName" />
                </p>
                <p>
                    <input type="submit" name="send" id="send" value="Submit" />
                </p>
            </form>
        </article>
    </body>
</html>
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="views/issuer/post.handlebars" %}
```markup
<html>
    <head>
        <title>{{title}}</title>
    </head>
    <body>
        <header>
            <h2>{{title}}</h2>
        </header>
        <article>
            <h3>VC</h3>
            <p>
                {{vc}}
            </p>
        </article>
        <article>
            <h3>VP</h3>
            <p>
                {{vp}}
            </p>
        </article>
    </body>
</html>
```
{% endtab %}
{% endtabs %}

Replace the `issuerGetHandler` and `issuerPostHandler` in `server.ts`, which are responsible for issuer functions, with the following snippet.

{% tabs %}
{% tab title="src/server.ts" %}
```typescript
/**
 * [Required] import the following class and method:
 *
 * express-validator       : `body` method
 * @getunid/node-wallet-sdk: `NameCredentialV1` class
 */
import { body } from 'express-validator'
import { NameCredentialV1 } from '@getunid/node-wallet-sdk'

// GET /issuer
const issuerGetHandler = (): Array<express.RequestHandler> => {
    return [
        validator([
        ]),
        async (req, res, next) => {
            try {
                return res.status(HttpStatus.OK).render('issuer/get', {
                    title: 'Issuer',
                })
            } catch (err) {
                return next(err)
            }
        }
    ]
}

// POST /issuer
const issuerPostHandler = (): Array<express.RequestHandler> => {
    return [
        validator([
            body('familyName').exists().isString().isLength({ min: 1 }),
            body('givenName').exists().isString().isLength({ min: 1 }),
        ]),
        async (req, res, next) => {
            const familyName = String(req.body['familyName'])
            const givenName  = String(req.body['givenName'])

            try {
                if (DID === undefined) {
                    throw new Error()
                }

                const vc = await DID.createCredential(
                    new NameCredentialV1({
                        '@type'   : 'NamePerson',
                        '@id'     : DID.getIdentifier(),
                        name      : `${ givenName } ${ familyName }`,
                        familyName: `${ familyName }`,
                        givenName : `${ givenName }`,
                    })
                )

                const vp = await DID.createPresentation([ vc ])

                return res.status(HttpStatus.OK).render('issuer/post', {
                    title: 'Issuer',
                    vc: JSON.stringify(vc),
                    vp: JSON.stringify(vp),
                })
            } catch (err) {
                return next(err)
            }
        }
    ]
}
```
{% endtab %}
{% endtabs %}

### 6. Implementation Verifier functions

The following are HTML and TypeScript snippets to implement the Verifier functions.

{% tabs %}
{% tab title="views/verifier/get.handlebars" %}
```markup
<html>
    <head>
        <title>{{title}}</title>
    </head>
    <body>
        <header>
            <h2>{{title}}</h2>
        </header>
        <article>
            <h3>Verify VC</h3>
            <form action="/verifier" method="POST">
                <p>
                    <label for="vc" style="display: block; font-weight: bold;">VC:</label>
                    <textarea name="vc" id="vc" rows="10" cols="80"></textarea>
                </p>
                <p>
                    <input type="submit" name="send" id="send" value="Submit" />
                </p>
            </form>
        </article>
        <article>
            <h3>Verify VP</h3>
            <form action="/verifier" method="POST">
                <p>
                    <label for="vp" style="display: block; font-weight: bold;">VP:</label>
                    <textarea name="vp" id="vp" rows="10" cols="80"></textarea>
                </p>
                <p>
                    <input type="submit" name="send" id="send" value="Submit" />
                </p>
            </form>
        </article>
    </body>
</html>
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="views/verifier/post.handlebars" %}
```markup
<html>
    <head>
        <title>{{title}}</title>
    </head>
    <body>
        <header>
            <h2>{{title}}</h2>
        </header>
        <article>
            <h3>Input</h3>
            <p>
                {{input}}
            </p>
        </article>
        <article>
            <h3>Result</h3>
            <p>
                {{result}}
            </p>
        </article>
        <article>
            <h3>Payload</h3>
            <p>
                {{payload}}
            </p>
        </article>
    </body>
</html>
```
{% endtab %}
{% endtabs %}

Similarly, let's replace `verifierGetHandler` and `verifierPostHandler`, which are responsible for verifier functions, with the following snippet

{% tabs %}
{% tab title="src/server.ts" %}
```typescript
/**
 * [Required] import the following class and method:
 *
 * express-validator       : `body` method
 * @getunid/node-wallet-sdk: `NameCredentialV1` class
 */
import { body } from 'express-validator'
import { NameCredentialV1 } from '@geunid/node-wallet-sdk'

// GET /verifier
const verifierGetHandler = (): Array<express.RequestHandler> => {
    return [
        validator([
        ]),
        async (req, res, next) => {
            try {
                return res.status(HttpStatus.OK).render('verifier/get', {
                    title: 'Verifier',
                })
            } catch (err) {
                return next(err)
            }
        }
    ]
}

// POST /verifier
const verifierPostHandler = (): Array<express.RequestHandler> => {
    return [
        validator([
            body('vc').optional().isString().isJSON().isLength({ min: 1 }),
            body('vp').optional().isString().isJSON().isLength({ min: 1 }),
        ]),
        async (req, res, next) => {
            const textVC = (req.body['vc'] !== undefined) ? String(req.body['vc']) : undefined
            const textVP = (req.body['vp'] !== undefined) ? String(req.body['vp']) : undefined

            try {
                if (DID === undefined) {
                    throw new Error()
                }

                // verify VC
                if (textVC !== undefined) {
                    const vc = JSON.parse(textVC)

                    if (! UNiD.isVerifiableCredential(vc)) {
                        throw new Error()
                    }

                    const verifiedVC = await UNiD.verifyCredential(vc)

                    // Get payload from VC
                    if (! NameCredentialV1.isCompatible(verifiedVC.payload)) {
                        throw new Error()
                    }
                    
                    const subject = verifiedVC.payload.credentialSubject

                    return res.status(HttpStatus.OK).render('verifier/post', {
                        title: 'Verifier',
                        input: textVC,
                        result: verifiedVC.isValid,
                        payload: JSON.stringify({
                            familyName: `${ subject.familyName }`,
                            givenName : `${ subject.givenName }`,
                        }),
                    })
                }

                // verify VP
                if (textVP !== undefined){
                    const vp = JSON.parse(textVP)

                    if (! UNiD.isVerifiablePresentation(vp)) {
                        throw new Error()
                    }

                    const verifiedVP = await UNiD.verifyPresentation(vp)

                    const selectedVC = NameCredentialV1.select(verifiedVP.payload)

                    if (selectedVC === undefined) {
                        throw new Error()
                    }

                    const verifiedVC = await UNiD.verifyCredential(selectedVC)

                    // get payload from VP
                    if (! NameCredentialV1.isCompatible(verifiedVC.payload)) {
                        throw new Error()
                    }

                    const subject = verifiedVC.payload.credentialSubject

                    return res.status(HttpStatus.OK).render('verifier/post', {
                        title: 'Verifier',
                        input: textVP,
                        result: verifiedVP.isValid,
                        payload: JSON.stringify({
                            familyName: `${ subject.familyName }`,
                            givenName : `${ subject.givenName }`,
                        }),
                    })
                }

                // No VC/VP
                throw new Error()
            } catch (err) {
                return next(err)
            }
        }
    ]
}
```
{% endtab %}
{% endtabs %}

&#x20;:thumbsup: Great work!! With these steps, the basic implementation of the Issuer and Verifier functions is complete. Let's run the application startup command `yarn start` and access `127.0.0.1:18080/issuer` with a web browser. The final directory structure and file layout are as follows.

```
.
├── package.json
├── src
│   └── server.ts
├── tsconfig.json
├── views
│   ├── issuer
│   │   ├── get.handlebars
│   │   └── post.handlebars
│   └── verifier
│       ├── get.handlebars
│       └── post.handlebars
└── yarn.lock
```
