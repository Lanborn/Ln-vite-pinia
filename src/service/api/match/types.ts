export interface IJoinRoomParams {
  room_id: number
  username: string
}

export interface IMatchApi {
  getRoomList: (params: any) => Promise<any>
  joinRoom: (params: IJoinRoomParams) => Promise<any>
}
