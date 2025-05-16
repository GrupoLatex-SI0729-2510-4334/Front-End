export class EvaluationsEntity {
  id!: number; // Propiedad agregada
  eventId!: number;
  rating!: number;
  comment!: string;
  checklist!: {
    punctualPayment: boolean;
    goodCommunication: boolean;
    respectedContract: boolean;
  };
}
