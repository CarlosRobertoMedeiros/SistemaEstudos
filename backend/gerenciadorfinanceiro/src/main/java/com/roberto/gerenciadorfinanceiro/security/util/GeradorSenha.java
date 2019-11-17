package com.roberto.gerenciadorfinanceiro.security.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeradorSenha {

    public static void main(String[] args) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        System.out.println(bCryptPasswordEncoder.encode("admin"));
        System.out.println(bCryptPasswordEncoder.encode("angular"));

    }
}
