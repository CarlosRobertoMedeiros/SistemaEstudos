package com.roberto.gerenciadorfinanceiro.repository;

import com.roberto.gerenciadorfinanceiro.model.LancamentoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LancamentoRepository extends JpaRepository<LancamentoModel,Long> {
    List<LancamentoModel> findByDescricaoIgnoreCaseContaining(String nome);
}
