import { EvaluationsEntity } from '../model/evaluations.entity';

export class EvaluationsAssembler {
  static toEntity(data: any): EvaluationsEntity {
    return {
      id: data.id,
      eventId: data.eventId,
      rating: data.rating,
      comment: data.comment,
      checklist: {
        punctualPayment: data.checklist.punctualPayment,
        goodCommunication: data.checklist.goodCommunication,
        respectedContract: data.checklist.respectedContract,
      },
    };
  }

  static toDto(entity: EvaluationsEntity): any {
    return {
      eventId: entity.eventId,
      rating: entity.rating,
      comment: entity.comment,
      punctualPayment: entity.checklist.punctualPayment,
      goodCommunication: entity.checklist.goodCommunication,
      respectedContract: entity.checklist.respectedContract,
    };
  }
}
