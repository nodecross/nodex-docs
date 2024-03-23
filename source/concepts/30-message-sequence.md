## Message Sequence

This section uses the overall message flow to show how and when the NodeX Agent encrypts and decrypts messages as they are communicated between devices.

Below is a sequence diagram of the message from transmission to reception.

```{mermaid}
sequenceDiagram
  autonumber
  actor app1 as Your App1
  participant agent1 as NodeX Agent
	actor app2 as Your App2
  participant agent2 as NodeX Agent
	participant studio as NodeX Studio
  
	app1->>+agent1: /create_verifiable_message
	agent1->>agent1: create verifiable message
	agent1->>+studio: /save_create_event(message_activity)
	studio->>studio: store message_activity
	studio-->>-agent1: response
	agent1-->>-app1: response(verifiable message)

  app1->>app2: send(app message)
	app2->>+agent2: /verify_verifiable_message
	agent2->>agent2: verify received message
	agent2->>+studio: /save_verify_event
	studio->>studio: verify message_activity.message_id
	studio-->>-agent2: response
	agent2-->>-app2: response
	app2->>app2: processing received messsage...

```
