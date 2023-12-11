import * as API from "."
export default {
  getClickhouseConnectionInfo: params => {
    return API.GET("/get_clickhouse_connection_info", params)
  },
  getALlNamesOfClickHouseInformation: params => {
    return API.GET("/get_all_names_of_clickhouse_information", params)
  },
  getClickhouseInfoByName: params => {
    return API.POST("/get_clickhouse_information_by_name", params)
  },
  testClickHouseConnection: params => {
    return API.POST("/test_clickhouse_connection", params)
  },
}
