import { IKafkaProducerService } from '../abstract/service/kafka/IKafkaProducerService';
import { KafkaProducerService } from './kafka/KafkaProducerService';

export abstract class BaseService {

    protected _kafkaProducerService: IKafkaProducerService;

    constructor(kafkaProducerService) {

        this._kafkaProducerService = kafkaProducerService;
    }

    handleError = (statusCode, error) => {
        try {
            if (this._kafkaProducerService && this._kafkaProducerService instanceof KafkaProducerService) {
                this._kafkaProducerService.pushSystemErrorMsg({ 
                    channels: ["email"], 
                    dataObjs: [{ message: error.statck }],
                });
            }
        } catch (error) {

        }
    }
}
