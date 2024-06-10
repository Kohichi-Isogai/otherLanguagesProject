package com.example.consumptionDateChecker

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class ConsumptionDateCheckerApplicationTests {

	@Test
	fun contextLoads() {
	}
	@Test
	fun `最初のテスト`() {
		assertThat(1+2, equalTo(3))
	}

}
