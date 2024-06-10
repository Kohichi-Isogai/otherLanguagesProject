package com.example.consumptionDateChecker

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ConsumptionController {

    @GetMapping("/api/items")
    fun getItems(): String{
        return "hello"
    }


}