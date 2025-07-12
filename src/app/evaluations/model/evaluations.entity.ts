export class EvaluationsEntity {
  id!: number;
  eventId!: number;
  rating!: number;
  comment!: string;
  checklist!: {
    punctualPayment: boolean;
    goodCommunication: boolean;
    respectedContract: boolean;
  };
}
