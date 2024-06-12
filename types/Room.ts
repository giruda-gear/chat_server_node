import { SocketLogger } from "../logs/winston";

interface Client {
    send(message: string): void;
}

interface Message {
    type: string;
    senderId: string;
    content: string;
}

class Room {
    private forward: Map<string, Room>;
    private clients: Set<Client>;

    constructor() {
        this.forward = new Map();
        this.clients = new Set();
    }

    join(client: Client): void {
        SocketLogger.info("User joined the room");
        this.clients.add(client);
    }

    leave(client: Client): void {
        SocketLogger.info("User leaved the room");
        this.clients.delete(client);
    }

    forwardMessage(message: Message): void {
        SocketLogger.info("Send message to all clients");
        for (const client of this.clients) {
            client.send(JSON.stringify(message));
        }
    }
}

function NewRoom() {
    return new Room();
}

export { NewRoom };
