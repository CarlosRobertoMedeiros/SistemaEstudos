package com.roberto.gerenciadorfinanceiro.config.oauth2;

import com.roberto.gerenciadorfinanceiro.config.token.CustomTokenEnhancer;
import com.roberto.gerenciadorfinanceiro.security.AppUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;


@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    @Autowired
    private AppUserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        //Conexão do Cliente
        clients.inMemory()
                .withClient("angular")
                .secret("$2a$10$dt6jhHj8LM3a9qQO77svK.MLd9wFeRlMcGHEc2iHYPTzlEhtb75wK") //angular
                .scopes("read", "write")
                .authorizedGrantTypes("password","refresh_token") // Atualização do token, falta colocar em um cookie seguro
                .accessTokenValiditySeconds(30) //30 segundos
                .refreshTokenValiditySeconds(3600*24) // 1 Dia
            .and()
                .withClient("mobile")//Para o Cliente Mobile só posso realizar a leitura
                .secret("$2a$10$dt6jhHj8LM3a9qQO77svK.MLd9wFeRlMcGHEc2iHYPTzlEhtb75wK") //angular
                .scopes("read")
                .authorizedGrantTypes("password","refresh_token") // Atualização do token, falta colocar em um cookie seguro
                .accessTokenValiditySeconds(30) //30 segundos
                .refreshTokenValiditySeconds(3600*24); // 1 Dia

    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
            .tokenStore(tokenStore())
            .accessTokenConverter(accessTokenConverter())
            .reuseRefreshTokens(false)
            .userDetailsService(userDetailsService)
            .authenticationManager(authenticationManager);
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        JwtAccessTokenConverter accessTokenConverter = new JwtAccessTokenConverter();
        accessTokenConverter.setSigningKey("roberto"); //Senha de validação do payLoad
        return accessTokenConverter;
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(accessTokenConverter());
    }

    @Bean
    public TokenEnhancer tokenEnhancer() {
        return new CustomTokenEnhancer();
    }
}
