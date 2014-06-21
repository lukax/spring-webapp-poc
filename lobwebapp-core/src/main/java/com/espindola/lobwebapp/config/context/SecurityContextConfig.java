package com.espindola.lobwebapp.config.context;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.approval.TokenStoreUserApprovalHandler;
import org.springframework.security.oauth2.provider.approval.UserApprovalHandler;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.security.oauth2.provider.request.DefaultOAuth2RequestFactory;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;

@Configuration
public class SecurityContextConfig {

	@Configuration
	@EnableWebSecurity
	protected static class SecurityConfig extends WebSecurityConfigurerAdapter {
		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth.inMemoryAuthentication()
				.withUser("usuario")
					.password("senha")
					.roles("USER");
		}
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http
				.authorizeRequests()
					.anyRequest().hasRole("USER").and()
				.exceptionHandling()
					.accessDeniedHandler(new OAuth2AccessDeniedHandler()).and()
				.httpBasic();
		}
		
		@Bean
		@Override
		public AuthenticationManager authenticationManagerBean() throws Exception {
			return super.authenticationManagerBean();
		}
	}
		
	@Configuration
	@EnableAuthorizationServer
	protected static class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
		@Autowired AuthenticationManager authenticationManagerBean;
		@Autowired TokenStore tokenStore;
		@Autowired ClientDetailsService clientDetailsService;
		@Autowired UserApprovalHandler userApprovalHandler;
		
		@Override
		public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
			clients.inMemory()
				.withClient("lobwebapp-html")
					.authorizedGrantTypes("password")
					.authorities("ROLE_CLIENT")
					.scopes("read","write");
		}
		
		@Override
		public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
			endpoints.authenticationManager(authenticationManagerBean)
					 .userApprovalHandler(userApprovalHandler)
					 .tokenStore(tokenStore);
		}
		
		@Bean
		public TokenStore tokenStore(){
			return new InMemoryTokenStore();
		}
		
		@Bean
		public UserApprovalHandler approvalHandler(){
			TokenStoreUserApprovalHandler userApprovalHandler = new TokenStoreUserApprovalHandler();
			userApprovalHandler.setTokenStore(tokenStore);
			userApprovalHandler.setClientDetailsService(clientDetailsService);
			userApprovalHandler.setRequestFactory(new DefaultOAuth2RequestFactory(clientDetailsService));
			return userApprovalHandler;
		}
	}
	
	@Configuration
	@EnableResourceServer
	protected static class ResourceServerConfig extends ResourceServerConfigurerAdapter{
		@Override
		public void configure(HttpSecurity http) throws Exception {
			http
				.requestMatchers()
					.antMatchers("/v1/**").and()
				.authorizeRequests()
					.anyRequest().authenticated();
		}
	}
}
