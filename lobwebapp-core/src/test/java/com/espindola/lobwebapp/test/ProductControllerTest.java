package com.espindola.lobwebapp.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.InputStream;
import java.math.BigDecimal;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
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
import com.espindola.lobwebapp.repository.ProductRepository;
import com.espindola.lobwebapp.util.TestUtils;

@WebAppConfiguration
@ActiveProfiles("dev")
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { TestContextConfig.class })
public class ProductControllerTest {
	private final String contextURI = "/product";

	@Autowired
	private WebApplicationContext webApplicationContext;
	@Autowired
	private ProductRepository productRepository;

	private MockMvc mockMvc;

	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
				.build();
	}

	@Test
	@Transactional
	public void findAll() throws Exception {
		mockMvc.perform(get(contextURI).accept(TestUtils.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk())
				.andExpect(
						content().contentType(TestUtils.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$", Matchers.empty()));
	}

	@Test
	@Transactional
	@Rollback
	public void save() throws Exception {
		Product product = new Product();
		product.setId(0L);
		product.setName("my super product");
		product.setPrice(new BigDecimal(100));
		product.setCategory("my category");
		product.setCostPrice(new BigDecimal(99));
		product.setDescription("not much");
		product.setNcm("1234.56.78");
		
		mockMvc.perform(
				post(contextURI)
						.accept(TestUtils.APPLICATION_JSON_UTF8)
						.contentType(TestUtils.APPLICATION_JSON_UTF8)
						.content(TestUtils.convertObjectToJsonBytes(product)))
				.andExpect(status().isCreated());

		mockMvc.perform(
				get(contextURI + "/1").accept(TestUtils.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk())
				.andExpect(
						content().contentType(TestUtils.APPLICATION_JSON_UTF8))
				.andExpect(
						jsonPath("$.name", Matchers.is(product.getName())));
	}

	//TODO: load populated DB
	//@Test
	@Transactional
	@Rollback
	public void uploadImage() throws Exception {
		
		String fileName = "testImage.gif";
		InputStream fileStream = ClassLoader
				.getSystemResourceAsStream(fileName);
		MockMultipartFile image = new MockMultipartFile(fileName, "data",
				"image/gif", fileStream);

		mockMvc.perform(
				fileUpload(contextURI + "/1/image").file(image).accept(
						TestUtils.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk())
				.andExpect(
						content().contentType(TestUtils.APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.fileName", Matchers.is(fileName)));

	}
}
