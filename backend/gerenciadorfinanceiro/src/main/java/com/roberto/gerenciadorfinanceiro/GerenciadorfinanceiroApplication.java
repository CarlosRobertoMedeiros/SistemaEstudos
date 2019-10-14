package com.roberto.gerenciadorfinanceiro;

import org.apache.commons.lang3.StringUtils;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * TODO: Criação do Perfil de Segurança com Integração com DEV ou Prod
 *
 *
 */

@SpringBootApplication
public class GerenciadorfinanceiroApplication {

    private static final Logger log = LoggerFactory.getLogger(GerenciadorfinanceiroApplication.class);

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(GerenciadorfinanceiroApplication.class);
        Environment env = app.run(args).getEnvironment();
        logarInicializacaoDaAplicacao(env);
    }

    private static void logarInicializacaoDaAplicacao(Environment env) {
        String protocol = "http";
        if (env.getProperty("spring.server.ssl.key-store") != null) {
            protocol = "https";
        }
        String serverPort = env.getProperty("spring.server.port");
        String contextPath = env.getProperty("spring.server.servlet.context-path");
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
                        "Profile(s): {}\n\t" +
                        "Database Information \n\t" +
                        "Url: \t\t{}\n\t" +
                        "Username: \t{}\n\t" +
                        "Password: \t{}\n" +
                        "----------------------------------------------------------",
                env.getProperty("spring.application.name"),
                protocol,
                serverPort,
                contextPath,
                protocol,
                hostAddress,
                serverPort,
                contextPath,
                env.getActiveProfiles(),
                env.getProperty("spring.datasource.url"),
                env.getProperty("spring.datasource.username"),
                env.getProperty("spring.datasource.password"));
    }

    /*@Override
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
    }*/
}

