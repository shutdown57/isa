type Payload = {
  limit?: number
  offset?: number
}

export class CommonQueryParams {
  private payload
  public constructor (payload: Payload) {
    if (payload) {
      this.payload = payload
    } else {
      this.payload = {}
    }
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
