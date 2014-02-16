package com.espindola.lobwebapp.config.context;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.jolbox.bonecp.BoneCPDataSource;

@Profile("prod")
@EnableTransactionManagement
@EnableJpaRepositories("com.espindola.lobwebapp.repository")
@Configuration
public class PersistenceProdContextConfig {
	
	@Autowired
	private Environment environment;
	
	@Bean
	public URI dbUrl() throws URISyntaxException{
		String clearDbUrl = environment.getProperty("CLEARDB_DATABASE_URL");
		return new URI(clearDbUrl);
	}
	
	@Bean
	public BoneCPDataSource dataSource() throws URISyntaxException{
		BoneCPDataSource dataSource = new BoneCPDataSource();
		dataSource.setDriverClass(environment.getProperty("jdbc.driverClassName"));
		dataSource.setJdbcUrl("jdbc:mysql://" + dbUrl().getHost() + dbUrl().getPath());
		dataSource.setUsername(dbUrl().getUserInfo().split(":")[0]);
		dataSource.setPassword(dbUrl().getUserInfo().split(":")[1]);
		dataSource.setMaxConnectionAgeInSeconds(15L);
		return dataSource;
	}
	
	@Bean
	public JpaTransactionManager transactionManager() throws URISyntaxException{
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setDataSource(dataSource());
		transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
		return transactionManager;
	}
	
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() throws URISyntaxException{
		LocalContainerEntityManagerFactoryBean bean = new LocalContainerEntityManagerFactoryBean();
		bean.setDataSource(dataSource());
		bean.setJpaVendorAdapter(hibernateJpaVendorAdapter());
		bean.setPackagesToScan("com.espindola.lobwebapp.domain");
			Properties jpaProperties = new Properties();
			jpaProperties.setProperty("hibernate.dialect", environment.getProperty("hibernate.dialect"));
			jpaProperties.setProperty("hibernate.ejb.naming_strategy", environment.getProperty("hibernate.ejb.naming_strategy"));
			jpaProperties.setProperty("hibernate.hbm2ddl.auto", environment.getProperty("hibernate.hbm2ddl.auto"));
			jpaProperties.setProperty("hibernate.format_sql", environment.getProperty("hibernate.format_sql"));
			jpaProperties.setProperty("hibernate.show_sql", environment.getProperty("hibernate.show_sql"));
		bean.setJpaProperties(jpaProperties);
		return bean;
	}
	
	@Bean
	public HibernateJpaVendorAdapter hibernateJpaVendorAdapter(){
		return new HibernateJpaVendorAdapter();
	}
}
