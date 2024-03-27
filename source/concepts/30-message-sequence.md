## Message Sequence

This section describes the overall message flow when using the NodeX agent.

There are two possible message flows when using the NodeX agent.

1. Verifiable Message
2. E2E Encrypted (VM)

#### Verifiable Message

NodeX Agent sends and receives verifiable messages between devices.
Below is a sequence diagram of the message from transmission to reception.

```{mermaid}
sequenceDiagram
  autonumber
  actor app1 as Your App1
  participant agent1 as NodeX Agent
	actor app2 as Your App2
  participant agent2 as NodeX Agent
	participant studio as NodeX Studio
  
	app1->>+agent1: /create-verifiable-message
	agent1->>agent1: create verifiable message
	agent1->>+studio: /save-create-event(message-activity)
	studio->>studio: store message-activity
	studio-->>-agent1: response
	agent1-->>-app1: response(verifiable message)

  app1->>app2: send(app message)
	app2->>+agent2: /verify-verifiable-message
	agent2->>agent2: verify received message
	agent2->>+studio: /save-verify-event
	studio->>studio: verify message-activity.message-id
	studio-->>-agent2: response
	agent2-->>-app2: response
	app2->>app2: processing received messsage...

```


#### E2E Encrypted (VM)

NodeX Agent sends and receives E2E Ecrypted messages between devices.
Below is a sequence diagram of the message from transmission to reception.

```{mermaid}
sequenceDiagram
  autonumber
  actor app1 as Your App1
  participant agent1 as NodeX Agent
	actor app2 as Your App2
  participant agent2 as NodeX Agent
	participant studio as NodeX Studio
  
	app1->>+agent1: /create-didcomm-message
	agent1->>agent1: create encrypted message
	agent1->>+studio: /save-create-event(message-activity)
	studio->>studio: store message-activity
	studio-->>-agent1: response
	agent1-->>-app1: response(encrypted message)

  app1->>app2: send(app message)
	app2->>+agent2: /verify-didcomm-message
	agent2->>agent2: verify received message
	agent2->>+studio: /save-verify-event
	studio->>studio: verify message-activity.message-id
	studio-->>-agent2: response
	agent2-->>-app2: response
	app2->>app2: processing received messsage...

```

