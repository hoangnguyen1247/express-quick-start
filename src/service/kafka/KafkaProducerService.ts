import * as kafka from 'kafka-node';

import { IKafkaProducerService } from '../../abstract/service/kafka/IKafkaProducerService';

export class KafkaProducerService implements IKafkaProducerService {

    private _producer;

    constructor() {

        const Producer = kafka.Producer;
        const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

        this._producer = new Producer(client);

        try {
            this._producer.on('ready', () => {
                // Do somethings
            });

            this._producer.on('error', (error) => {
                try {
                    console.log('error', error && error.message ? error.message : error);
                } catch (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    pushLogMsg = async (data) => {
        const payloads = [
            { 
                topic: 'insert-log', 
                key: "",
                messages: JSON.stringify(data),
            },
        ];

        this._producer.send(payloads, (err, result) => {
            console.log(err || result);
        });
    }

    pushSystemErrorMsg = async (data) => {
        const payloads = [
            { 
                topic: 'send-system-error', 
                key: "",
                messages: JSON.stringify(data),
            },
        ];

        this._producer.send(payloads, (err, result) => {
            console.log(err || result);
        });
    }
}
