package com.example.consumptionDateChecker

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate

@CrossOrigin(origins = ["http://localhost:8080/"], maxAge = 3600)
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
    fun getNewItem(@PathVariable("barCode") barCode:Long ): YahooItem{
        println(barCode);

        val url = "https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=$appId&jan_code=4514603356816"
        val res: ResponseEntity<String> = restTemplate.getForEntity<String>(url, String::class.java)
        val json= res.body!!
        val name = json.split(""""name":"""")[1].split("""","description"""")[0];
        val image = json.split(""""medium":"""")[1].split(""""},""")[0]

        return YahooItem(
            name,
            image
        )
    }

}