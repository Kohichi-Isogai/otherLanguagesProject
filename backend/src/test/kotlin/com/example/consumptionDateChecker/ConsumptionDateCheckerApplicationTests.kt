package com.example.consumptionDateChecker

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.test.context.jdbc.Sql
import java.time.LocalDate
import java.util.*


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql("/insert_test_data.sql")
class ConsumptionDateCheckerApplicationTests (
	@Autowired val restTemplate: TestRestTemplate,
	@LocalServerPort val port: Int
) {

	@Test
	fun `GETリクエストはOKステータスを返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/api/items", String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

	@Test
	fun `GETリクエストはusersオブジェクトを返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/api/items", Array<Item>::class.java)
		val items =response.body!!
		assertThat(items.size, equalTo(1))
		assertThat(items[0].id , equalTo(1))
		assertThat(items[0].item , equalTo("アサヒ飲料 おいしい水 天然水"))
		assertThat(items[0].image_url , equalTo("https://item-shopping.c.yimg.jp/i/g/misono-support_b5-696"))
		assertThat(items[0].quantity , equalTo(10))
		val date = "2024-06-09"
		val tmp =items[0].limit_date
		assertThat(tmp.toString() , equalTo(date.toString()))
		assertThat(items[0].user_id , equalTo(1))
	}

	@Test
	fun `POSTリクエストはItemリクエストを格納する`() {
		val request = ItemPostRequest(
			"AGF(エージーエフ) ブレンディ スティック カフェオレ 【 スティックコーヒー 】",
			"https://item-shopping.c.yimg.jp/i/g/nostal-dou_2022yr12mt18daywq069ic0b9vsjczp",
			27,
			1)
		val postResponse = restTemplate.postForEntity("http://localhost:$port/api/items", request,String::class.java)
		assertThat(postResponse.statusCode, equalTo(HttpStatus.OK))

		val getResponse = restTemplate.getForEntity("http://localhost:$port/api/items", Array<Item>::class.java)
		val items = getResponse.body!!
		assertThat(items.size, equalTo(2))
		assertThat(items[1].item , equalTo("AGF(エージーエフ) ブレンディ スティック カフェオレ 【 スティックコーヒー 】"))
		assertThat(items[1].image_url , equalTo("https://item-shopping.c.yimg.jp/i/g/nostal-dou_2022yr12mt18daywq069ic0b9vsjczp"))
		assertThat(items[1].quantity , equalTo(27))
		val date = LocalDate.now()
		val tmp =items[1].limit_date
		assertThat(tmp.toString() , equalTo(date.toString()))
		assertThat(items[1].user_id , equalTo(1))
	}

	@Test
	fun `PutリクエストでItemを修正する`() {
		val beforeGetResponse = restTemplate.getForEntity("http://localhost:$port/api/items", Array<Item>::class.java)
		val beforeItems = beforeGetResponse.body!!

		val request = ItemPutRequest(
			beforeItems[0].id,
			beforeItems[0].item,
			beforeItems[0].image_url,
			5,
			beforeItems[0].limit_date,
			beforeItems[0].user_id)

		restTemplate.put("http://localhost:$port/api/items",request,String::class.java)

		val afterGetResponse = restTemplate.getForEntity("http://localhost:$port/api/items", Array<Item>::class.java)
		val afterItems = afterGetResponse.body!!
		assertThat(afterItems[0].id , equalTo(beforeItems[0].id))
		assertThat(afterItems[0].item , equalTo(beforeItems[0].item))
		assertThat(afterItems[0].image_url , equalTo(beforeItems[0].image_url))
		assertThat(afterItems[0].quantity , equalTo(5))
		assertThat(afterItems[0].limit_date , equalTo(beforeItems[0].limit_date))
		assertThat(afterItems[0].user_id , equalTo(beforeItems[0].user_id))
	}


	@Test
	fun `DELETEリクエストでItemを消す`() {
		val putRequest = ItemPostRequest(
			"AGF(エージーエフ) ブレンディ スティック カフェオレ 【 スティックコーヒー 】",
			"https://item-shopping.c.yimg.jp/i/g/nostal-dou_2022yr12mt18daywq069ic0b9vsjczp",
			27,
			1)
		restTemplate.postForEntity("http://localhost:$port/api/items", putRequest,String::class.java)

		val getBeforeResponse = restTemplate.getForEntity("http://localhost:$port/api/items", Array<Item>::class.java)
		val beforeItems = getBeforeResponse.body!!
		assertThat(beforeItems.size, equalTo(2))

		val deleteRequest = beforeItems[1].id
		restTemplate.delete("http://localhost:$port/api/items/$deleteRequest")

		val getAfterResponse = restTemplate.getForEntity("http://localhost:$port/api/items", Array<Item>::class.java)
		val afterItems = getAfterResponse.body!!
		assertThat(afterItems.size, equalTo(1))
		assertThat(afterItems[0].id , equalTo(1))

	}

}
