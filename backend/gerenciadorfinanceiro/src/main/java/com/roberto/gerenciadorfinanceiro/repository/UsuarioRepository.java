package com.roberto.gerenciadorfinanceiro.repository;

import com.roberto.gerenciadorfinanceiro.model.Permissao;
import com.roberto.gerenciadorfinanceiro.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    public Optional<Usuario> findByEmail(String email);
    public Optional<Usuario> findByNome(String nome);
    public List<Permissao> findByPermissoes(String permissaoDescricao);
}

//Continuar de 08:25 -> 6.11. Movendo o usuário para o banco de dados