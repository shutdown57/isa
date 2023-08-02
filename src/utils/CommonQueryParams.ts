export class CommonQueryParams {
  private payload
  public constructor (payload: any) {
    this.payload = payload
  }

  get params () {
    if (!('limit' in this.payload)) {
      this.payload.limit = 20
    }
    if (!('offset' in this.payload)) {
      this.payload.offset = 0
    }
    return this.payload
  }
}
