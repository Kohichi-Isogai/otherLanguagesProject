package com.example.consumptionDateChecker

import kotlinx.serialization.json.Json
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate

//@CrossOrigin(origins = ["http://localhost:8080/"], maxAge = 3600)
@RestController
class ConsumptionController(
    @Autowired val consumptionRepository: consumptionRepository,
) {
    @Value("\${app.id}")
    lateinit var appId: String

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
    fun getNewItem(@PathVariable("barCode") barCode:Long ): ReturnYahooItem{

        val url = "https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=$appId&jan_code=$barCode"
        val res: ResponseEntity<String> = restTemplate.getForEntity<String>(url, String::class.java)
        val jsonData= res.body!!
        val json = Json {
            ignoreUnknownKeys = true
        }
        val result = json.decodeFromString<YahooItem>(jsonData)
        println(result.hits[0].name)

        return ReturnYahooItem(
            result.hits[0].name,
            result.hits[0].image.medium
        )

    }

}