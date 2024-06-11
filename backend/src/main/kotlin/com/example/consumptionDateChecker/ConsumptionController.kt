package com.example.consumptionDateChecker

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
class ConsumptionController(@Autowired val consumptionRepository: consumptionRepository) {

    @GetMapping("/api/items")
    fun getItems(): Array<Item>{
        return consumptionRepository.getItemsRepository()
    }

}