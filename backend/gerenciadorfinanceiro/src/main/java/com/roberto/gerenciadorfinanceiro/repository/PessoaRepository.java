package com.roberto.gerenciadorfinanceiro.repository;

import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<PessoaModel,Long> {

}
