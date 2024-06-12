package com.example.consumptionDateChecker

import kotlinx.serialization.Serializable

@Serializable
data class YahooItem(
    val hits: List<Hit>
)

@Serializable
data class Hit(
    val name: String,
    val image: Image
)

@Serializable
data class Image(
    val medium: String
)

data class ReturnYahooItem(
    val name: String,
    val image: String
)