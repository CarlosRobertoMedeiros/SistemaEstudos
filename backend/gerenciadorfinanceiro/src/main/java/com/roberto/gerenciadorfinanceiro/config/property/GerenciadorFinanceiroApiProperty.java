package com.roberto.gerenciadorfinanceiro.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "gerenciadorfinanceiro")
public class GerenciadorFinanceiroApiProperty {

    private String originPermitida = "http://localhost:4200";

    public String getOriginPermitida() {
        return originPermitida;
    }

    public void  setOriginPermitida(String originPermitida){
        this.originPermitida = originPermitida;
    }


    private final Seguranca seguranca = new Seguranca();

    public final Seguranca getSeguranca() {
        return seguranca;
    }

    public static class Seguranca {
        private boolean enableHttps;

        public final boolean isEnableHttps() {
            return enableHttps;
        }

        public final void setEnableHttps(boolean enableHttps) {
            this.enableHttps = enableHttps;
        }

    }

}
