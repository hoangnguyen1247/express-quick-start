export interface IKafkaProducerService {

    pushSystemErrorMsg(data): Promise<any>;
}
