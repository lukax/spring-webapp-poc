package com.espindola.lobwebapp.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.Date;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import com.espindola.lobwebapp.config.TestContextConfig;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.util.TestUtil;

@ActiveProfiles("dev")
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {TestContextConfig.class})
@WebAppConfiguration
public class ProductControllerTest {
	private final String contextUrl = "/product/";
	
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
		mockMvc.perform(get(contextUrl).accept(TestUtil.APPLICATION_JSON_UTF8))
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
		p.setPrice(new BigDecimal(100));
		p.setCategory("my category");
		p.setCostPrice(new BigDecimal(99));
		p.setDescription("not much");
		p.setRegisterDate(new Date());
		p.setNcm("1234.56.78");

		mockMvc.perform(
				post(contextUrl).accept(TestUtil.APPLICATION_JSON_UTF8)
						.contentType(TestUtil.APPLICATION_JSON_UTF8)
						.content(TestUtil.convertObjectToJsonBytes(p)))
				.andExpect(status().isCreated());

		mockMvc.perform(
				get(contextUrl + "1").accept(TestUtil.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk())
				.andExpect(
						content().contentType(TestUtil.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.name", Matchers.is(p.getName())));
	}

}
