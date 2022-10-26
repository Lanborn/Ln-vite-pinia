export interface IUploadParams {
  file: File
}
export interface IFaceSpotParams {
  file: File
}

export interface IMainApi {
  uploadImg: (params: IUploadParams) => Promise<any>
  faceSpot: (params: IFaceSpotParams) => Promise<any>
  getTodayInfo: () => Promise<any>
}
