package com.example.consumptionDateChecker

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate



@RestController
class ConsumptionController(
    @Autowired val consumptionRepository: consumptionRepository
) {

    val restTemplate: RestTemplate = RestTemplate()

    @GetMapping("/api/items")
    fun getItems(): Array<Item>{
        return consumptionRepository.getItemsRepository()
    }

    @PostMapping("/api/items")
    fun postItem(@RequestBody itemRequest:ItemPostRequest){
        consumptionRepository.postItemRepository(itemRequest)
        return
    }

    @PutMapping("/api/items")
    fun putItem(@RequestBody itemRequest:ItemPutRequest){
        consumptionRepository.putItemRepository(itemRequest)
        return
    }

    @DeleteMapping("/api/items/{id}")
    fun deleteItem(@PathVariable("id") id:Long){
        val itemRequest = ItemDeleteRequest(id)
        consumptionRepository.deleteItemRepository(itemRequest)
        return
    }
    @GetMapping("/api/items/new/{barCode}")
    fun getNewItem(@PathVariable("barCode") barCode:Long ,@Autowired yahooItem: YahooItem): Array<Item>{
        println(barCode);

        val url = "https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=dj00aiZpPUFydjhKTHpRaHB0aCZzPWNvbnN1bWVyc2VjcmV0Jng9ZjU-&jan_code=4514603356816"
        val res: ResponseEntity<String> = restTemplate.getForEntity<String>(url, String::class.java)
        val json = res.body

        println(json)

        return consumptionRepository.getItemsRepository()
    }

}