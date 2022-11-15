export interface IJoinRoomParams {
  roomId: number
  userId: number
}

export interface IMatchApi {
  getRoomList: (params: any) => Promise<any>
  joinRoom: (params: IJoinRoomParams) => Promise<any>
  exitRoom: (params: IJoinRoomParams) => Promise<any>
}
