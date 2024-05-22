export enum PayloadTypes {
  convertID = "convert-id",
}
type Payload<T> = {
  type: string;
  payload: T;
};

export type ConvertIDPayload = Payload<{
  replacementTxt: string;
  binary: string;
}>;
