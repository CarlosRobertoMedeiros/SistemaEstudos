package com.roberto.gerenciadorfinanceiro.repository;

import com.roberto.gerenciadorfinanceiro.model.LancamentoModel;
import com.roberto.gerenciadorfinanceiro.repository.lancamento.LancamentoRepositoryQuery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LancamentoRepository extends JpaRepository<LancamentoModel,Long> , LancamentoRepositoryQuery {
    List<LancamentoModel> findByDescricaoIgnoreCaseContaining(String nome);

}
