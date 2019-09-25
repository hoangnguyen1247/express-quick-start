import * as kafka from 'kafka-node';

import { IKafkaProducerService } from '../../abstract/service/kafka/IKafkaProducerService';
import { BaseService } from '../BaseService';

export class KafkaProducerService extends BaseService implements IKafkaProducerService {

    private _producer;

    constructor() {
        super();

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

    pushConfirmOrderMsg = async (data) => {
        const payloads = [
            { 
                topic: 'confirm-order', 
                key: "",
                messages: JSON.stringify(data),
            },
        ];

        this._producer.send(payloads, (err, result) => {
            console.log(err || result);
        });
    }

    pushConfirmOrderExpatMsg = async (data) => {
        const payloads = [
            { 
                topic: 'confirm-order-expat', 
                key: "",
                messages: JSON.stringify(data),
            },
        ];

        this._producer.send(payloads, (err, result) => {
            console.log(err || result);
        });
    }

    pushOrderPickupSuccessMsg = async (data) => {
        const payloads = [
            { 
                topic: 'order-pickup-success', 
                key: "",
                messages: JSON.stringify(data),
            },
        ];

        this._producer.send(payloads, (err, result) => {
            console.log(err || result);
        });
    }

    pushSendLaundryToVendorMsg = async (data) => {
        const payloads = [
            { 
                topic: 'send-laundry-to-vendor-success', 
                key: "",
                messages: JSON.stringify(data),
            },
        ];

        this._producer.send(payloads, (err, result) => {
            console.log(err || result);
        });
    }

    pushDeliveryOrderCompletedMsg = async (data) => {
        const payloads = [
            { 
                topic: 'create-delivery-order-completed', 
                key: "",
                messages: JSON.stringify(data),
            },
        ];

        this._producer.send(payloads, (err, result) => {
            console.log(err || result);
        });
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
