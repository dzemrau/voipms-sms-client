/// <reference path="../third-party/moment/moment.d.ts" />

/**
 * Represents the type of a message.
 */
enum MessageType {
    /**
     * A message received by the local phone number.
     */
    Incoming,
    /**
     * A message sent by the local phone number.
     */
    Outgoing
}

/**
 * Represents an SMS message.
 */
class Message {
    /**
     * The ID number associated with the message.
     */
    public id: number;
    /**
     * The text of the message.
     */
    text: string;
    /**
     * The date the message was sent or received by the local phone number, as appropriate.
     */
    date: Moment;
    /**
     * The type of the message (incoming or outgoing).
     */
    type: MessageType;
    /**
     * The recipient of the message.
     */
    to: string;
    /**
     * The sender of the message.
     */
    from: string;

    /**
     * Initializes a new instance of the Message class.
     * @param id The ID number associated with the message.
     * @param text The text of the message.
     * @param date The date the message was sent or received by the local phone number, as appropriate.
     * @param type The type of the message (incoming or outgoing).
     * @param local The phone number of the person currently using the application.
     * @param remote The phone number of the person not currently using the application.
     */
    constructor(id: number, text: string, date: Moment, type: MessageType, local: string, remote: string) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.type = type;
        if (this.type === MessageType.Incoming) {
            this.to = local;
            this.from = remote;
        }
        else if (this.type === MessageType.Outgoing) {
            this.to = remote;
            this.from = local;
        }
    }

    /**
     * Restores an original Message object (with functions) from an object containing only message data. These
     * data-only objects are the result of stringifying the original object, storing it in the browser's local storage,
     * then parsing the saved JSON at a later point.
     * @param savedObject An object containing only raw message data.
     * @returns {*} The original Message object, or null if the message data could not be parsed.
     */
    static createMessage(savedObject: any): Message {
        try {
            var message: Message = null;
            if (savedObject.type == MessageType.Incoming) {
                message = new Message(savedObject.id, savedObject.text, moment(savedObject.date), savedObject.type,
                    savedObject.to, savedObject.from);
            }
            else if (savedObject.type == MessageType.Outgoing) {
                message = new Message(savedObject.id, savedObject.text, moment(savedObject.date), savedObject.type,
                    savedObject.from, savedObject.to);
            }
            return message;
        }
        catch (err) {
            return null;
        }
    }

    /**
     * Gets the local phone number associated with the message (i.e. the phone number of the person currently using
     * the application).
     * @returns {string} The local phone number.
     */
    getLocalPhoneNumber(): string {
        if (this.type === MessageType.Incoming) {
            return this.to;
        }
        else if (this.type === MessageType.Outgoing) {
            return this.from;
        }
    }

    /**
     * Gets the remote phone number associated with the message (i.e. the phone number of the person not currently
     * using the application).
     * @returns {string} The remote phone number.
     */
    getRemotePhoneNumber(): string {
        if (this.type === MessageType.Incoming) {
            return this.from;
        }
        else if (this.type === MessageType.Outgoing) {
            return this.to;
        }
    }
}