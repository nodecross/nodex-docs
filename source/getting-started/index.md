# Getting Started

Try an example of sending a message via a NodeX Agent and receiving it.

## Installing NodeX Agent and set up

First. We setup NodeX Agent.
A tutorial without cloning the NodeX repository is currently in preparation.

Before running following commands, please install [rust](https://www.rust-lang.org/).

In the commands below, use the project secret key and project DID provided by CollaboGate Japan, Inc.

```sh
$ git clone git@github.com:nodecross/nodex.git
$ cd /path/to/nodex
$ cargo run -- --config network set --key secret_key --value <YOUR PROJECT SECRET KEY>
$ cargo run -- --config network set --key project_did --value <YOUR PROJECT DID>
```

## Message Send/Receive Flow

This section shows how to send a message to NodeX Hub via NodeX Agent, receive a message from NodeX Hub, and notify that a message is read to NodeX Hub.

This is a simple sequence diagram of sending a message and receiving it.

```{mermaid}
sequenceDiagram
    autonumber
    actor app1 as Your App1
    participant Agent1 as NodeX Agent
    participant Hub as NodeX Hub
    participant Agent2 as NodeX Agent
    actor app2 as Your App2

    %% Send Message Flow
		app1->>Agent1: /transfer
    Note left of Agent1: Message

    Agent1->>Hub: /send_message
    Note left of Hub: Message(DIDComm Encrypted)

    %% Receive Message flow
    app2->>+Agent2: /receive (WebSocket connection)

    Agent2->>Hub: /get_message_list
    Hub-->Agent2: /get_message_list response (if exists)
    Note left of Agent2: Message(DIDComm Encrypted)
    Agent2-->>app2: Message

    %% Ack Message flow
    app2-->>Agent2: Ack message
    Note left of app2: MessageId
    Agent2-->>Hub: /ack_message
    Note left of Agent2: MessageId(DIDComm Encrypted)

    Agent2->>-app2: /receive (WebSocket connection) closed

```

## How to Send Messages in NodeX

In this section, you will see where you can use NodeX to send and receive messages addressed to you.

```{note}
It takes about 30 minutes for the DID to be registered in the decentralized anchoring system and for messages to actually be sent and received.
```

### Requirements

- Please set up NodeX Agent before the below action.
- This section uses node.js. So, please install it.

1. Check your own DID.

```sh
$ cat ~/.config/nodex/config.json | grep did
```

2. Wake up NodeX Agent.

```sh
$ cd /path/to/nodex
# Run nodex Agent
$ cargo run
```

3. Run receive message example. The original code is **[here](https://github.com/nodecross/nodex/tree/9bbcf0f6bcb6d0b487df7ed8368e347612053f27/examples/nodejs/cli)**.

The following is part of the example code.

```js
const URL = "ws+" + base + ":/receive";
console.log("connecting to " + URL);
const socket = new WebSocket(URL);

console.log("socket connected");
socket.on("open", () => {
  console.log("socket opened");
});

socket.on("message", (data) => {
  console.log("socket received: " + data);
  const message = JSON.parse(data.toString());
  const response = {
    message_id: message.message_id,
  };
  socket.send(JSON.stringify(response));
});

// close the socket after 30 seconds
setTimeout(() => {
  console.log("closing socket");
  socket.close();
}, 30000);
```

Execute the following commands.

```shell
$ cd /path/to/nodex/examples/nodejs
$ yarn receive
```

4. Send a message to you via NodeX. This example sends some JSON messages. The original code is [here](https://github.com/nodecross/nodex/blob/develop/examples/nodejs/src/transfer.ts).

The following is part of the example code.

```js
(async () => {
  const json = await post("/transfer", {
    destinations: ["<add your did>"],
    messages: [
      {
        string: "value",
        number: 1,
        boolean: true,
        array: [],
        map: {},
      },
      {
        string: "value",
        number: 1,
        boolean: true,
        array: [],
        map: {},
      },
    ],
    metadata: {
      string: "value",
      number: 1,
      boolean: true,
      array: [],
      map: {},
    },
  });

  console.log(json);
})();
```

Execute the following commands.

```sh
$ cd /path/to/nodex/examples/nodejs
$ yarn transfer
```

5. Check the example application’s log
   You will see the following logs.
