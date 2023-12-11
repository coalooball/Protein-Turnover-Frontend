import * as API from "./"

export default {
  hostInformations: params => {
    return API.GET("/host_informations", params)
  },
  createClickhouseInformation: params => {
    return API.POST("/create_clickhouse_information", params)
  },
  readAllClickhouseInformation: params => {
    return API.GET("/read_all_clickhouse_information", params)
  },
  deleteClickhouseInformation: params => {
    return API.POST("/delete_clickhouse_information", params)
  },
}
