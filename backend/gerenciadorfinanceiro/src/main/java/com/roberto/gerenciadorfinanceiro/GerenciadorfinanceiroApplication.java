package com.roberto.gerenciadorfinanceiro;

import com.roberto.gerenciadorfinanceiro.ambiente.config.AmbienteConstantes;
import com.roberto.gerenciadorfinanceiro.ambiente.config.PerfilPadraoUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.env.Environment;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;

@SpringBootApplication
public class GerenciadorfinanceiroApplication implements InitializingBean {

	/* TODO: 08/10/2019 Informar no log os dados de conexão do ambiente e se possível um banner configurável,
		     Pensar futuramente na implementação de segurança utilizando os profiles
		     Para poder continuar com o curso de frontend
	 */

    /*
     *   TODO: Implementar os testes unitários
     * */

    private static final Logger log = LoggerFactory.getLogger(GerenciadorfinanceiroApplication.class);

    private final Environment env;

    public GerenciadorfinanceiroApplication(Environment env) {
        this.env = env;
    }


    public static void main(String[] args) {

        SpringApplication app = new SpringApplication(GerenciadorfinanceiroApplication.class);
        PerfilPadraoUtil.adicionaPerfilPadrao(app);
        Environment env = app.run(args).getEnvironment();
        logarInicializacaoDaAplicacao(env);
    }

    private static void logarInicializacaoDaAplicacao(Environment env) {

        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        String serverPort = env.getProperty("server.port");
        String contextPath = env.getProperty("server.servlet.context-path");
        if (StringUtils.isBlank(contextPath)) {
            contextPath = "/";
        }
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }
        log.info("\n----------------------------------------------------------\n\t" +
                        "Application '{}' is running! Access URLs:\n\t" +
                        "Local: \t\t{}://localhost:{}{}\n\t" +
                        "External: \t{}://{}:{}{}\n\t" +
                        "Profile(s): \t{}\n----------------------------------------------------------",
                env.getProperty("spring.application.name"),
                protocol,
                serverPort,
                contextPath,
                protocol,
                hostAddress,
                serverPort,
                contextPath,
                env.getActiveProfiles());
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());

        if (activeProfiles.contains(AmbienteConstantes.PERFIL_PADRAO_DEV) && activeProfiles.contains(AmbienteConstantes.PERFIL_PADRAO_PROD)) {
            log.error("You have misconfigured your application! It should not run " +
                    "with both the 'dev' and 'prod' profiles at the same time.");
        }
        if (activeProfiles.contains(AmbienteConstantes.PERFIL_PADRAO_DEV) && activeProfiles.contains(AmbienteConstantes.PERFIL_PADRAO_CLOUD)) {
            log.error("You have misconfigured your application! It should not " +
                    "run with both the 'dev' and 'cloud' profiles at the same time.");
        }
    }
}
