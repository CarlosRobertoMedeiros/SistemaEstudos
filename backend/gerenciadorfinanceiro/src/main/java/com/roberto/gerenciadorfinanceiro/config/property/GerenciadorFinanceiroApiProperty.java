package com.roberto.gerenciadorfinanceiro.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("gerenciadorfinanceiro")
public class GerenciadorFinanceiroApiProperty {
    private final String originPermitida = "http://localhost:9000";

    public final String getOriginPermitida() {
        return originPermitida;
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
