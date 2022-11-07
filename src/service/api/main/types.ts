export interface IUploadParams {
  file: File
}
export interface IFaceSpotParams {
  file: File
}

export interface IGetInfoParams {
  pageSize: number
  pageNo: number
}

export interface IMainApi {
  uploadImg: (params: IUploadParams) => Promise<any>
  faceSpot: (params: IFaceSpotParams) => Promise<any>
  getTodayInfo: (params: IGetInfoParams) => Promise<any>
  regFaceInfo: (params: any) => Promise<any>
  getSevenInfo: (params: IGetInfoParams) => Promise<any>
}
