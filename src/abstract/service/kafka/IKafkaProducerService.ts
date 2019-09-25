import { NotifierDataDto } from '../../../dto/NotifierDataDto';

export interface IKafkaProducerService {

    pushLogMsg(data: NotifierDataDto): Promise<any>;

    pushSystemErrorMsg(data: NotifierDataDto): Promise<any>;
}
