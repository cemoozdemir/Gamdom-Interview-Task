export enum MessageType {
  Success = "Successful",
  Error = "Error",
}

export enum Action {
  BettingSlip = "Betting Slip",
}

export enum ActionType {
  Create = "Create",
  Read = "Read",
  Update = "Update",
  Delete = "Delete",
}

export function messageReturn(
  messageType: MessageType,
  action: Action,
  actionType: ActionType
): string {
  if (messageType === MessageType.Success) {
    return `${actionType} ${action} ${messageType}`;
  } else if (messageType === MessageType.Error) {
    return `${messageType} occured on ${action} ${actionType}`;
  } else return "";
}
