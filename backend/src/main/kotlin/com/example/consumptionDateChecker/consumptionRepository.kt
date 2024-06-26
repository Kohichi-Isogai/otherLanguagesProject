package com.example.consumptionDateChecker

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository
import java.sql.ResultSet
import java.time.LocalDate

class ItemRowMapper : RowMapper<Item> {
    override fun mapRow(rs: ResultSet, rowNum: Int): Item {
        return Item(rs.getLong(1),rs.getString(2),rs.getString(3),rs.getLong(4),rs.getDate(5),rs.getLong(6))
    }

}

@Repository
class consumptionRepository(@Autowired val jdbcTemplate: JdbcTemplate) {
    fun getItemsRepository(): Array<Item>{
        val itemRowMapper = ItemRowMapper()
        val response = jdbcTemplate.query("SELECT * FROM items", itemRowMapper)
        return response.toTypedArray()
    }


    fun getItemIdRepository(itemRequest: ItemGetIdRequest): Array<Item>{

        val itemRowMapper = ItemRowMapper()
        val response = jdbcTemplate.query("SELECT * FROM items WHERE id = ${itemRequest.id}", itemRowMapper)
        return response.toTypedArray()
    }



    fun postItemRepository(itemRequest: ItemPostRequest) {
        jdbcTemplate.update(
            "INSERT INTO items (item,image_url,quantity,limit_date,user_id) VALUES (?,?,?,?,?)",
            itemRequest.item,
            itemRequest.image_url,
            itemRequest.quantity,
            itemRequest.limit_date,
            itemRequest.user_id
        )
    }
    fun putItemRepository(itemRequest: ItemPutRequest) {
        jdbcTemplate.update(
            "UPDATE items SET item = ?, image_url = ?, quantity = ?, limit_date = ? WHERE id = ?",
            itemRequest.item,
            itemRequest.image_url,
            itemRequest.quantity,
            itemRequest.limit_date,
            itemRequest.id
        )

    }

    fun deleteItemRepository(itemRequest: ItemDeleteRequest) {
        jdbcTemplate.update(
            "DELETE FROM items WHERE id = ?",
            itemRequest.id
        )

    }

}
