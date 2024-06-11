package com.example.consumptionDateChecker

import java.sql.Date

data class Item(val id: Long, val item:String, val image_url: String,val quantity:Long,val limit_date:Date,val user_id:Long)
