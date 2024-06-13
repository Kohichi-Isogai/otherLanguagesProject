package com.example.consumptionDateChecker

import java.sql.Date
import java.time.LocalDate

data class ItemPostRequest(val item:String, val image_url: String, val quantity:Long, val limit_date:LocalDate, val user_id:Long)
data class ItemPutRequest(val id:Long ,val item:String, val image_url: String, val quantity:Long, val limit_date:LocalDate, val user_id:Long)
data class ItemDeleteRequest(val id:Long )
data class ItemGetIdRequest(val id:Long )
