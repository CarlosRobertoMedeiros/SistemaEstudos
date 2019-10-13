package com.roberto.gerenciadorfinanceiro.ambiente.config;

import org.springframework.boot.SpringApplication;

import java.util.HashMap;
import java.util.Map;

/**
 * Classe Utilitária Responsável por Criar um perfil Padrão caso não exista,
 * Se não setar {@code spring.profile.active} perfil usado como padrão será o usado como
 * AmbienteConstantes.PERFIL_PADRAO_DEV.
 */
public final class PerfilPadraoUtil {
    private static final String PERFIL_PADRAO_SPRING = "spring.profile.default";

    private PerfilPadraoUtil(){
    }

    /**
     * Seta o perfil padrão caso outros não tenha sido chamados
     * @param app
     */
    public static void adicionaPerfilPadrao(SpringApplication app){
        Map<String,Object> defProperties = new HashMap<>();
        defProperties.put(PERFIL_PADRAO_SPRING, AmbienteConstantes.PERFIL_PADRAO_DEV);
    }


}
