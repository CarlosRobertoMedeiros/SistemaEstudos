package com.roberto.gerenciadorfinanceiro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GerenciadorfinanceiroApplication {

	/* TODO: 08/10/2019 Informar no log os dados de conexão do ambiente e se possível um banner configurável,
		     Pensar futuramente na implementação de segurança utilizando os profiles
		     Para poder continuar com o curso de frontend
	 */


    public static void main(String[] args) {
        SpringApplication.run(GerenciadorfinanceiroApplication.class, args);

    }

}
