package com.espindola.lobwebapp;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import com.espindola.lobwebapp.domain.Product;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:testContext.xml" })
@WebAppConfiguration
public class ProductControllerTest {

	@Autowired
	private WebApplicationContext webApplicationContext;
	private MockMvc mockMvc;

	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
				.build();
	}

	@Test
	@Transactional
	public void findAll() throws Exception {
		mockMvc.perform(get("/product").accept(TestUtil.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk())
				.andExpect(
						content().contentType(TestUtil.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$", Matchers.empty()));
	}

	@Test
	@Transactional
	@Rollback
	public void save() throws Exception {
		Product p = new Product();
		p.setId(0L);
		p.setName("my super product");
		p.setPrice(100D);
		p.setCategory("my category");
		p.setCostPrice(99D);
		p.setDescription("not much");
		p.setRegisterDate(new Date());
		p.setNcm("1234.56.78");

		mockMvc.perform(
				post("/product").accept(TestUtil.APPLICATION_JSON_UTF8)
						.contentType(TestUtil.APPLICATION_JSON_UTF8)
						.content(TestUtil.convertObjectToJsonBytes(p)))
				.andExpect(status().isCreated());

		mockMvc.perform(
				get("/product/1").accept(TestUtil.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk())
				.andExpect(
						content().contentType(TestUtil.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.name", Matchers.is(p.getName())));
	}

}
