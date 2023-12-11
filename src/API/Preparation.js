import * as API from "."
export default {
  findAllMzMLPepxmlFilesInDir: params => {
    return API.POST("/find_all_mzML_pepxml_files_in_dir", params)
  },
  boolCheckClickhouseConnection: params => {
    return API.GET("/bool_check_clickhouse_connection", params)
  },
  getAllPepxmlTableNames: params => {
    return API.GET("/get_all_pepxml_table_names", params)
  },
  getAllMzmlTableNames: params => {
    return API.GET("/get_all_mzml_table_names", params)
  },
}
